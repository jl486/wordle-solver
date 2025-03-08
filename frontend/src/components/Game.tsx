import { useCallback, useEffect, useRef } from 'react';
import { useGame, useGameDispatch } from '../contexts/GameContext';
import { useWindowEvent } from '../hooks/useWindowEvent';
import Grid from './Grid';

interface GameProps {
  solution: string | undefined;
}

export default function Game({ solution }: GameProps) {
  const game = useGame();
  const dispatch = useGameDispatch();

  const currentGuessLengthRef = useRef(game.currentGuess.length);

  // Initialize solution
  useEffect(() => {
    if (solution) {
      dispatch({
        type: 'SET_SOLUTION',
        solution: solution
      });
    }
  }, [solution, dispatch]);

  useWindowEvent('keydown', useCallback(({ key }: KeyboardEvent) => {
    if (/^[A-Za-z]$/.test(key) && currentGuessLengthRef.current < 5) {
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
  }, [dispatch]));

  return (
    <div className="w-full max-w-96 mx-auto my-0 flex flex-col">
      <div>solution: {game.solution ? game.solution : 'Loading...'}</div>
      <Grid
        currentGuess={game.currentGuess}
        history={game.history}
        tries={game.tries}
      />
    </div>
  );
}
