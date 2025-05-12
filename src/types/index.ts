export type Player = "dog" | "cat";
export type SquareValue = Player | null;
export type GameDifficulty = "easy" | "medium" | "hard";
export type GameMode = "pvp" | "ai";

export interface PlayerState {
  name: string;
  dollars: number;
  stars: number;
  isAI?: boolean;
}

export interface GameState {
  board: SquareValue[][];
  currentPlayer: Player;
  dogPlayer: PlayerState;
  catPlayer: PlayerState;
  gameStarted: boolean;
  gameOver: boolean;
  winner: Player | "tie" | null;
  difficulty: GameDifficulty;
  moveHistory: {player: Player, position: [number, number]}[];
  connectedSquares: [number, number][] | null;
  boardsFilled: number;
  gameMode: GameMode;
}

export interface SetupFormValues {
  dogName: string;
  catName: string;
  difficulty: GameDifficulty;
  gameMode: GameMode;
  playerRole?: Player;
}