import { Player, SquareValue, GameState, GameDifficulty } from "../types";

export const createInitialGameState = (
  dogName: string,
  catName: string,
  difficulty: GameDifficulty,
  gameMode: "pvp" | "ai",
  playerRole?: Player
): GameState => {
  const initialDollars = getDifficultyDollars(difficulty);
  
  return {
    board: Array(5).fill(null).map(() => Array(5).fill(null)),
    currentPlayer: Math.random() < 0.5 ? "dog" : "cat",
    dogPlayer: {
      name: dogName,
      dollars: initialDollars,
      stars: 0,
      isAI: gameMode === "ai" && playerRole === "cat"
    },
    catPlayer: {
      name: catName,
      dollars: initialDollars,
      stars: 0,
      isAI: gameMode === "ai" && playerRole === "dog"
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
      return 30;
    case "medium":
      return 20;
    case "hard":
      return 15;
    default:
      return 20;
  }
};

export const getAIMove = (board: SquareValue[][], player: Player): [number, number] => {
  // First, try to complete a line if possible
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        const testBoard = board.map(row => [...row]);
        testBoard[i][j] = player;
        if (checkForThreeConnection(testBoard, i, j, player)) {
          return [i, j];
        }
      }
    }
  }

  // Then, block opponent's potential three-in-a-row
  const opponent = player === "dog" ? "cat" : "dog";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        const testBoard = board.map(row => [...row]);
        testBoard[i][j] = opponent;
        if (checkForThreeConnection(testBoard, i, j, opponent)) {
          return [i, j];
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
  player: Player
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
          board[r][c] === player
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
  const { dogPlayer, catPlayer } = gameState;
  
  if (dogPlayer.dollars <= 0 || catPlayer.dollars <= 0) {
    let winner: Player | "tie" | null = null;
    
    if (dogPlayer.dollars <= 0 && catPlayer.dollars <= 0) {
      if (dogPlayer.stars > catPlayer.stars) {
        winner = "dog";
      } else if (catPlayer.stars > dogPlayer.stars) {
        winner = "cat";
      } else {
        winner = "tie";
      }
    } else if (dogPlayer.dollars <= 0) {
      winner = "cat";
    } else {
      winner = "dog";
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
    dogPlayer: {
      ...gameState.dogPlayer,
      dollars: gameState.dogPlayer.dollars + BONUS_DOLLARS
    },
    catPlayer: {
      ...gameState.catPlayer,
      dollars: gameState.catPlayer.dollars + BONUS_DOLLARS
    },
    gameOver: false,
    winner: null,
    board: Array(5).fill(null).map(() => Array(5).fill(null)),
    boardsFilled: gameState.boardsFilled + 1
  };
};