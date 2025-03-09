import { useCallback, useEffect } from 'react';
import { useGame, useGameDispatch } from '../contexts/GameContext';
import { useWindowEvent } from '../hooks/useWindowEvent';
import Grid from './Grid';

interface GameProps {
  solution: string | undefined;
}

export default function Game({ solution }: GameProps) {
  const game = useGame();
  const dispatch = useGameDispatch();

  useEffect(() => {
    if (solution) {
      dispatch({
        type: 'SET_SOLUTION',
        payload: solution
      });
    }
  }, [solution, dispatch]);

  useWindowEvent('keydown', useCallback(({ key }: KeyboardEvent) => {
    if (/^[A-Za-z]$/.test(key) && game.currentGuess.length < 5) {
      dispatch({
        type: 'ADD_LETTER',
        payload: key
      });
    }

    if (key === 'Backspace') {
      dispatch({
        type: 'DELETE_LETTER'
      });
    }

    if (key === 'Enter') {
      dispatch({
        type: 'ADD_GUESS'
      });
    }
  }, [dispatch, game.currentGuess]));

  return (
    <div className="w-full max-w-96 mx-auto my-4 flex flex-col ">
      <Grid />
    </div>
  );
}
