import { useCallback } from "react";
import { useGame, useGameDispatch } from "../contexts/GameContext";
import { useWindowEvent } from "../hooks/useWindowEvent";

export default function Game() {
  const game = useGame();
  const dispatch = useGameDispatch();

  useWindowEvent("keydown", useCallback(({ key }: KeyboardEvent) => {
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
  }, []))

  return (
    <div>current guess: {game.currentGuess}</div>
  );
}
