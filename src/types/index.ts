export type SquareValue = string | null;
export type GameDifficulty = "easy" | "medium" | "hard";
export type GameMode = "pvp" | "ai";

export interface PlayerState {
  name: string;
  dollars: number;
  stars: number;
  emoji: string;
  isAI?: boolean;
}

export interface GameState {
  board: SquareValue[][];
  currentPlayer: 'player1' | 'player2';
  player1: PlayerState;
  player2: PlayerState;
  gameStarted: boolean;
  gameOver: boolean;
  winner: 'player1' | 'player2' | "tie" | null;
  difficulty: GameDifficulty;
  moveHistory: {player: 'player1' | 'player2', position: [number, number]}[];
  connectedSquares: [number, number][] | null;
  boardsFilled: number;
  gameMode: GameMode;
}

export interface SetupFormValues {
  player1Name: string;
  player1Emoji: string;
  player2Name: string;
  player2Emoji: string;
  difficulty: GameDifficulty;
  gameMode: GameMode;
  playerRole?: 'player1' | 'player2';
}