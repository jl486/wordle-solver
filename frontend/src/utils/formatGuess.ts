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
