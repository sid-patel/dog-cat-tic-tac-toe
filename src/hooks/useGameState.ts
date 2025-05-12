import { useState, useEffect, useCallback } from 'react';
import { 
  GameState, 
  Player, 
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

const DOG_BARK_SOUND = "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3";
const CAT_MEOW_SOUND = "https://assets.mixkit.co/active_storage/sfx/583/583-preview.mp3";
const REWARD_SOUND = "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3";

const dogBarkAudio = new Audio(DOG_BARK_SOUND);
const catMeowAudio = new Audio(CAT_MEOW_SOUND);
const rewardAudio = new Audio(REWARD_SOUND);

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  const initGame = useCallback((formValues: SetupFormValues) => {
    const { dogName, catName, difficulty, gameMode, playerRole } = formValues;
    const initialState = createInitialGameState(dogName, catName, difficulty, gameMode, playerRole);
    setGameState(initialState);
  }, []);
  
  const resetGame = useCallback(() => {
    if (!gameState) return;
    
    const initialState = createInitialGameState(
      gameState.dogPlayer.name,
      gameState.catPlayer.name,
      gameState.difficulty,
      gameState.gameMode,
      gameState.dogPlayer.isAI ? 'cat' : (gameState.catPlayer.isAI ? 'dog' : undefined)
    );
    
    setGameState(initialState);
  }, [gameState]);

  const endGame = useCallback(() => {
    setGameState(null);
  }, []);
  
  const handleMove = useCallback((row: number, col: number) => {
    if (!gameState || gameState.gameOver) return;
    
    if (gameState.board[row][col] !== null) return;
    
    const currentPlayerState = gameState.currentPlayer === 'dog' 
      ? gameState.dogPlayer 
      : gameState.catPlayer;
      
    if (currentPlayerState.dollars <= 0) return;
    
    if (soundEnabled) {
      if (gameState.currentPlayer === 'dog') {
        dogBarkAudio.play();
      } else {
        catMeowAudio.play();
      }
    }
    
    const newBoard = gameState.board.map(row => [...row]);
    newBoard[row][col] = gameState.currentPlayer;
    
    let updatedGameState = {
      ...gameState,
      board: newBoard,
      moveHistory: [
        ...gameState.moveHistory, 
        {player: gameState.currentPlayer, position: [row, col] as [number, number]}
      ],
      dogPlayer: {
        ...gameState.dogPlayer,
        dollars: gameState.currentPlayer === 'dog' 
          ? gameState.dogPlayer.dollars - 1 
          : gameState.dogPlayer.dollars
      },
      catPlayer: {
        ...gameState.catPlayer,
        dollars: gameState.currentPlayer === 'cat' 
          ? gameState.catPlayer.dollars - 1 
          : gameState.catPlayer.dollars
      },
      connectedSquares: null
    };
    
    const connectedSquares = checkForThreeConnection(
      newBoard, 
      row, 
      col, 
      gameState.currentPlayer
    );
    
    if (connectedSquares) {
      if (soundEnabled) {
        rewardAudio.play();
      }
      
      const REWARD_DOLLARS = 5;
      
      updatedGameState = {
        ...updatedGameState,
        connectedSquares,
        dogPlayer: {
          ...updatedGameState.dogPlayer,
          dollars: gameState.currentPlayer === 'dog' 
            ? updatedGameState.dogPlayer.dollars + REWARD_DOLLARS 
            : updatedGameState.dogPlayer.dollars,
          stars: gameState.currentPlayer === 'dog' 
            ? updatedGameState.dogPlayer.stars + 1 
            : updatedGameState.dogPlayer.stars
        },
        catPlayer: {
          ...updatedGameState.catPlayer,
          dollars: gameState.currentPlayer === 'cat' 
            ? updatedGameState.catPlayer.dollars + REWARD_DOLLARS 
            : updatedGameState.catPlayer.dollars,
          stars: gameState.currentPlayer === 'cat' 
            ? updatedGameState.catPlayer.stars + 1 
            : updatedGameState.catPlayer.stars
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
      currentPlayer: gameState.currentPlayer === 'dog' ? 'cat' : 'dog'
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
      ((gameState.currentPlayer === 'dog' && gameState.dogPlayer.isAI) ||
       (gameState.currentPlayer === 'cat' && gameState.catPlayer.isAI))
    ) {
      const timerRef = setTimeout(() => {
        const [row, col] = getAIMove(gameState.board, gameState.currentPlayer);
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