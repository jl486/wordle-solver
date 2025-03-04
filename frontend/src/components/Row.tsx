import { useEffect, useState } from "react";
import { Letter } from "../types";
import { RowItem } from "./RowItem";

interface RowProps {
  guess?: Letter[];
  currentGuess?: string;
}

export default function Row({ guess, currentGuess }: RowProps) {
  const [flipped, setIsFlipped] = useState<number[]>([]);

  useEffect(() => {
    if (guess) {
      guess.forEach((_, i) => {
        setTimeout(() => {
          setIsFlipped((prev) => [...prev, i]);
        }, i * 300 + 300)
      })
    }
  }, [guess])

  const animationDelays = [
    "[animation-delay:0.0s]",
    "[animation-delay:0.3s]",
    "[animation-delay:0.6s]",
    "[animation-delay:0.9s]",
    "[animation-delay:1.2s]"
  ];

  if (guess) {
    return (
      <div className="text-center flex justify-center">
        {guess.map((item, i) => (
          <RowItem
            key={i}
            variant={flipped.includes(i) ? item.color : "current"}
            className={`animate-flip ${animationDelays[i]}`}
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
