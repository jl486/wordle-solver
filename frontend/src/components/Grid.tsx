import { GuessItem } from "../types";
import Row from "./Row";

interface GridProps {
  currentGuess: string;
  history: GuessItem[][];
  tries: number;
}

export default function Grid({ history }: GridProps) {
  return (
    <>
      {history.map((guess, i) => (
        <Row 
          key={i}
          guess={guess}
        />
      ))}
    </>
  );
}
