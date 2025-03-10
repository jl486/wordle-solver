import { useGame } from '../contexts/GameContext';
import Row from './Row';

export default function Grid() {
  const game = useGame();

  return (
    <div className="flex justify-center items-center flex-col flex-grow">
      {game.history.map((guess, i) => (
        <Row
          key={i}
          guess={guess}
          currentGuess={game.tries === i ? game.currentGuess : undefined}
        />
      ))}
    </div>
  );
}
