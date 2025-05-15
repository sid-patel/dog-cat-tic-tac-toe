import { GameState, GameDifficulty, SquareValue } from '../types';

export const createInitialGameState = (
  player1Name: string,
  player1Emoji: string,
  player2Name: string,
  player2Emoji: string,
  difficulty: GameDifficulty,
  gameMode: "pvp" | "ai",
  playerRole?: 'player1' | 'player2'
): GameState => {
  const initialDollars = getDifficultyDollars(difficulty);
  
  return {
    board: Array(5).fill(null).map(() => Array(5).fill(null)),
    currentPlayer: Math.random() < 0.5 ? 'player1' : 'player2',
    player1: {
      name: player1Name,
      emoji: player1Emoji,
      dollars: initialDollars,
      stars: 0,
      isAI: gameMode === "ai" && playerRole === "player2"
    },
    player2: {
      name: player2Name,
      emoji: player2Emoji,
      dollars: initialDollars,
      stars: 0,
      isAI: gameMode === "ai" && playerRole === "player1"
    },
    gameStarted: true,
    gameOver: false,
    winner: null,
    difficulty,
    moveHistory: [],
    connectedSquares: null,
    boardsFilled: 0,
    gameMode
  };
};

export const getDifficultyDollars = (difficulty: GameDifficulty): number => {
  switch (difficulty) {
    case "easy":
      return 20;
    case "medium":
      return 15;
    case "hard":
      return 10;
    default:
      return 15;
  }
};

export const getAIMove = (board: SquareValue[][], playerEmoji: string): [number, number] => {
  // First, try to complete a line if possible
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        const testBoard = board.map(row => [...row]);
        testBoard[i][j] = playerEmoji;
        if (checkForThreeConnection(testBoard, i, j, playerEmoji)) {
          return [i, j];
        }
      }
    }
  }

  // Then, block opponent's potential three-in-a-row
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        const testBoard = board.map(row => [...row]);
        // Try all possible opponent emojis
        for (const cell of board.flat()) {
          if (cell && cell !== playerEmoji) {
            testBoard[i][j] = cell;
            if (checkForThreeConnection(testBoard, i, j, cell)) {
              return [i, j];
            }
          }
        }
      }
    }
  }

  // Otherwise, make a strategic move
  const availableSquares: [number, number][] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        availableSquares.push([i, j]);
      }
    }
  }

  // Prefer center and corners if available
  const preferredMoves = availableSquares.filter(([i, j]) => {
    return (i === 2 && j === 2) || // center
           (i === 0 && j === 0) || // corners
           (i === 0 && j === 4) ||
           (i === 4 && j === 0) ||
           (i === 4 && j === 4);
  });

  if (preferredMoves.length > 0) {
    return preferredMoves[Math.floor(Math.random() * preferredMoves.length)];
  }

  // If no preferred moves, choose randomly
  return availableSquares[Math.floor(Math.random() * availableSquares.length)];
};

export const checkForThreeConnection = (
  board: SquareValue[][],
  row: number,
  col: number,
  value: string
): [number, number][] | null => {
  const directions = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonal down
    [1, -1] // diagonal up
  ];

  for (const [dr, dc] of directions) {
    let connectedSquares: [number, number][] = [[row, col]];

    // Check in both directions
    for (const multiplier of [-1, 1]) {
      let r = row + dr * multiplier;
      let c = col + dc * multiplier;
      
      // Check up to 2 positions in this direction
      for (let i = 0; i < 2; i++) {
        if (
          r >= 0 && r < board.length &&
          c >= 0 && c < board[0].length &&
          board[r][c] === value
        ) {
          connectedSquares.push([r, c]);
          r += dr * multiplier;
          c += dc * multiplier;
        } else {
          break;
        }
      }
    }

    if (connectedSquares.length >= 3) {
      return connectedSquares;
    }
  }

  return null;
};

export const isBoardFull = (board: SquareValue[][]): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

export const checkGameOver = (gameState: GameState): GameState => {
  const { player1, player2 } = gameState;
  
  if (player1.dollars <= 0 || player2.dollars <= 0) {
    let winner: 'player1' | 'player2' | "tie" | null = null;
    
    if (player1.dollars <= 0 && player2.dollars <= 0) {
      if (player1.stars > player2.stars) {
        winner = 'player1';
      } else if (player2.stars > player1.stars) {
        winner = 'player2';
      } else {
        winner = "tie";
      }
    } else if (player1.dollars <= 0) {
      winner = 'player2';
    } else {
      winner = 'player1';
    }
    
    return {
      ...gameState,
      gameOver: true,
      winner
    };
  }
  
  return gameState;
};

export const handleTie = (gameState: GameState): GameState => {
  const BONUS_DOLLARS = 10;
  
  return {
    ...gameState,
    player1: {
      ...gameState.player1,
      dollars: gameState.player1.dollars + BONUS_DOLLARS
    },
    player2: {
      ...gameState.player2,
      dollars: gameState.player2.dollars + BONUS_DOLLARS
    },
    gameOver: false,
    winner: null,
    board: Array(5).fill(null).map(() => Array(5).fill(null)),
    boardsFilled: gameState.boardsFilled + 1
  };
};