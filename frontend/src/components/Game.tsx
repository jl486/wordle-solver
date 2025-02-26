import { useCallback } from "react";
import { useGame, useGameDispatch } from "../contexts/GameContext";
import { useWindowEvent } from "../hooks/useWindowEvent";

interface GameProps {
  solution: Solution | undefined;
}

export default function Game({ solution }: GameProps) {
  const game = useGame();
  const dispatch = useGameDispatch();

  useWindowEvent("keydown", useCallback(({ key }: KeyboardEvent) => {
    if (/^[A-Za-z]$/.test(key) && game.currentGuess.length < 5) {
      dispatch({
        type: "ADD_LETTER",
        payload: key
      });
    }

    if (key === "Backspace") {
      dispatch({
        type: "DELETE_LETTER"
      });
    }

    if (key === "Enter") {
      dispatch({
        type: "ADD_GUESS"
      })
    }
  }, [game.currentGuess.length, dispatch]))

  return (
    <>
      <div>current guess: {game.currentGuess}</div>
      <div>solution: {solution ? solution.word : "Loading..."}</div>
    </>
  );
}
