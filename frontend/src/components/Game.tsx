import { useEffect } from "react";
import { useGame, useGameDispatch } from "../contexts/GameContext";

export default function Game() {
  const game = useGame();
  const dispatch = useGameDispatch();

  const handleKeyUp = ({ key }: KeyboardEvent) => {
    console.log(key);
    if (key === "Backspace") {
      dispatch({
        type: "DELETE_LETTER"
      });
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (game.currentGuess.length < 5) {
        dispatch({
          type: "ADD_LETTER",
          payload: key
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return (
    <div>current guess: {game.currentGuess}</div>
  );
}
