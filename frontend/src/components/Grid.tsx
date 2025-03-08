import { Letter } from '../types';
import Row from './Row';

interface GridProps {
  currentGuess: string | undefined;
  history: Letter[][];
  tries: number;
}

export default function Grid({ currentGuess, history, tries }: GridProps) {
  return (
    <div className="flex justify-center items-center flex-col flex-grow">
      {history.map((guess, i) => (
        <Row
          key={i}
          guess={guess}
          currentGuess={tries === i ? currentGuess : undefined}
        />
      ))}
    </div>
  );
}
