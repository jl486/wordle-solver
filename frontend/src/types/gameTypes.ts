export interface FormattedGuessItem {
  key: string;
  color: string
}

export interface GameState {
  currentGuess: string;
  history: string[];
  formattedHistory: FormattedGuessItem[][],
  tries: number;
  solution: string | undefined;
  isSolved: boolean;
}

export interface Action {
  type: string;
  payload?: string;
  solution?: string;
}

export interface Solution {
  id: number;
  word: string;
}
