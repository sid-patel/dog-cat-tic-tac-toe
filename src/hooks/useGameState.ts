import { useState, useEffect, useCallback } from 'react';
import { 
  GameState, 
  GameDifficulty, 
  SetupFormValues 
} from '../types';
import { 
  createInitialGameState, 
  checkForThreeConnection, 
  checkGameOver,
  handleTie,
  isBoardFull,
  getAIMove
} from '../utils/gameLogic';

const MOVE_SOUND = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
const REWARD_SOUND = "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3";

const moveAudio = new Audio(MOVE_SOUND);
const rewardAudio = new Audio(REWARD_SOUND);

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  const initGame = useCallback((formValues: SetupFormValues) => {
    const { player1Name, player1Emoji, player2Name, player2Emoji, difficulty, gameMode, playerRole } = formValues;
    const initialState = createInitialGameState(
      player1Name,
      player1Emoji,
      player2Name,
      player2Emoji,
      difficulty,
      gameMode,
      playerRole
    );
    setGameState(initialState);
  }, []);
  
  const resetGame = useCallback(() => {
    if (!gameState) return;
    
    const initialState = createInitialGameState(
      gameState.player1.name,
      gameState.player1.emoji,
      gameState.player2.name,
      gameState.player2.emoji,
      gameState.difficulty,
      gameState.gameMode,
      gameState.player1.isAI ? 'player2' : (gameState.player2.isAI ? 'player1' : undefined)
    );
    
    setGameState(initialState);
  }, [gameState]);

  const endGame = useCallback(() => {
    setGameState(null);
  }, []);
  
  const handleMove = useCallback((row: number, col: number) => {
    if (!gameState || gameState.gameOver) return;
    
    if (gameState.board[row][col] !== null) return;
    
    const currentPlayerState = gameState.currentPlayer === 'player1' 
      ? gameState.player1 
      : gameState.player2;
      
    if (currentPlayerState.dollars <= 0) return;
    
    if (soundEnabled) {
      moveAudio.play();
    }
    
    const newBoard = gameState.board.map(row => [...row]);
    newBoard[row][col] = currentPlayerState.emoji;
    
    let updatedGameState = {
      ...gameState,
      board: newBoard,
      moveHistory: [
        ...gameState.moveHistory, 
        {player: gameState.currentPlayer, position: [row, col] as [number, number]}
      ],
      player1: {
        ...gameState.player1,
        dollars: gameState.currentPlayer === 'player1' 
          ? gameState.player1.dollars - 1 
          : gameState.player1.dollars
      },
      player2: {
        ...gameState.player2,
        dollars: gameState.currentPlayer === 'player2' 
          ? gameState.player2.dollars - 1 
          : gameState.player2.dollars
      },
      connectedSquares: null
    };
    
    const connectedSquares = checkForThreeConnection(
      newBoard, 
      row, 
      col, 
      currentPlayerState.emoji
    );
    
    if (connectedSquares) {
      if (soundEnabled) {
        rewardAudio.play();
      }
      
      const REWARD_DOLLARS = 5;
      
      updatedGameState = {
        ...updatedGameState,
        connectedSquares,
        player1: {
          ...updatedGameState.player1,
          dollars: gameState.currentPlayer === 'player1' 
            ? updatedGameState.player1.dollars + REWARD_DOLLARS 
            : updatedGameState.player1.dollars,
          stars: gameState.currentPlayer === 'player1' 
            ? updatedGameState.player1.stars + 1 
            : updatedGameState.player1.stars
        },
        player2: {
          ...updatedGameState.player2,
          dollars: gameState.currentPlayer === 'player2' 
            ? updatedGameState.player2.dollars + REWARD_DOLLARS 
            : updatedGameState.player2.dollars,
          stars: gameState.currentPlayer === 'player2' 
            ? updatedGameState.player2.stars + 1 
            : updatedGameState.player2.stars
        }
      };
    }
    
    if (isBoardFull(newBoard)) {
      updatedGameState = {
        ...updatedGameState,
        board: Array(5).fill(null).map(() => Array(5).fill(null)),
        boardsFilled: updatedGameState.boardsFilled + 1
      };
    }
    
    updatedGameState = {
      ...updatedGameState,
      currentPlayer: gameState.currentPlayer === 'player1' ? 'player2' : 'player1'
    };
    
    updatedGameState = checkGameOver(updatedGameState);
    
    setGameState(updatedGameState);
  }, [gameState, soundEnabled]);
  
  useEffect(() => {
    if (gameState?.winner === 'tie') {
      const timerRef = setTimeout(() => {
        setGameState(handleTie(gameState));
      }, 2000);
      
      return () => clearTimeout(timerRef);
    }
  }, [gameState]);
  
  useEffect(() => {
    if (gameState?.connectedSquares) {
      const timerRef = setTimeout(() => {
        setGameState(state => state ? { ...state, connectedSquares: null } : null);
      }, 1500);
      
      return () => clearTimeout(timerRef);
    }
  }, [gameState?.connectedSquares]);
  
  useEffect(() => {
    if (
      gameState &&
      !gameState.gameOver &&
      ((gameState.currentPlayer === 'player1' && gameState.player1.isAI) ||
       (gameState.currentPlayer === 'player2' && gameState.player2.isAI))
    ) {
      const timerRef = setTimeout(() => {
        const [row, col] = getAIMove(gameState.board, gameState[gameState.currentPlayer].emoji);
        handleMove(row, col);
      }, 1000);
      
      return () => clearTimeout(timerRef);
    }
  }, [gameState, handleMove]);
  
  return {
    gameState,
    initGame,
    resetGame,
    handleMove,
    soundEnabled,
    setSoundEnabled,
    endGame
  };
};

export default useGameState;