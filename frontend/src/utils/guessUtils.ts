import { GameState } from "../types";

export function formatGuess(guess: string, solution: string) {
  const formatted = [...guess].map((ch) => ({
    key: ch,
    color: "grey"
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
  if (state.tries >= 6) return "No more guesses";
  if (state.currentGuess.length !== 5) return "Guess must be 5 letters long";
  if (state.history.includes(state.currentGuess)) return "You already tried that word";

  return null;
}
