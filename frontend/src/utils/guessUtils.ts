import { GameState, Letter } from "../types";

export function formatGuess(guess: string, solution: string) {
  const formatted: Letter[] = [...guess].map((ch) => ({
    key: ch,
    color: "gray"
  }));

  const solutionLetters = [...solution];

  // Mark greens
  formatted.forEach((item, i) => {
    if (item.key === solution[i]) {
      formatted[i].color = "green";
      solutionLetters[i] = "";
    }
  });

  // Mark yellows
  formatted.forEach((item, _) => {
    if (item.color !== "green" && solutionLetters.includes(item.key)) {
      item.color = "yellow";
      solutionLetters[solutionLetters.indexOf(item.key)] = "";
    }
  });

  return formatted;
}

export function validateGuess(state: GameState) {
  if (state.tries >= 6) {
    return "No more guesses";
  }

  if (state.currentGuess.length !== 5) {
    return "Guess must be 5 letters long";
  }

  const inHistory = state.history.some((guess) => (
    guess &&
    guess.length === state.currentGuess.length &&
    guess.every((item, i) => item.key === state.currentGuess[i])
  ));  

  if (inHistory) {
    return "You already tried that word";
  }

  return null;
}
