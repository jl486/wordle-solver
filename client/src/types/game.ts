export interface Letter {
  key: string;
  color: 'default' | 'gray' | 'yellow' | 'green' | null | undefined;
}

export interface GameState {
  currentGuess: string;
  history: Letter[][];
  tries: number;
  solution: string | undefined;
  isSolved: boolean;
}

export interface Action {
  type: string;
  payload?: string;
}

export interface Solution {
  id: number;
  word: string;
}
