import { GuessItem } from "../types";
import Row from "./Row";

interface GridProps {
  currentGuess: string | undefined;
  history: GuessItem[][];
  tries: number;
}

export default function Grid({ currentGuess, history, tries }: GridProps) {
  return (
    <>
      {history.map((guess, i) => {
        if (tries === i) {
          return (
            <Row
              key={i}
              guess={guess}
              currentGuess={currentGuess}
            />
          );
        }

        return (
          <Row 
            key={i}
            currentGuess={undefined}
            guess={guess}
          />
        );
      })}
    </>
  );
}
