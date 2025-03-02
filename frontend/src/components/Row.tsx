import { Letter } from "../types";
import { RowItem } from "./RowItem";

interface RowProps {
  guess?: Letter[];
  currentGuess?: string;
}

type VariantType = "default" | "yellow" | "green" | null | undefined;

export default function Row({ guess, currentGuess }: RowProps) {
  if (guess) {
    return (
      <div className="text-center flex justify-center">
        {guess.map((item, i) => (
          <RowItem
            key={i}
            variant={item.color as VariantType}
          >
            {item.key}
          </RowItem>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = [...currentGuess];
    return (
      <div className="text-center flex justify-center">
        {letters.map((item, i) => (
          <RowItem
            key={i}
            variant="current"
          >
            {item}
          </RowItem>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <RowItem 
            key={i}
            variant="default"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="text-center flex justify-center">
      {[...Array(5)].map((_, i) => (
        <RowItem 
          key={i}
          variant="default"
        />
      ))}
    </div>
  );
}
