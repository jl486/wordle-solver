import { FormattedGuessItem } from "../types";
import Row from "./Row";

interface GridProps {
  currentGuess: string;
  formattedHistory: FormattedGuessItem[][];
  tries: number;
}

export default function Grid({ formattedHistory }: GridProps) {
  return (
    <>
      {formattedHistory.map((_, i) => (
        <Row 
          key={i}
        />
      ))}
    </>
  );
}
