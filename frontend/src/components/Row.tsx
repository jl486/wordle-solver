import { GuessItem } from "../types";

interface RowProps {
  guess: GuessItem[] | undefined;
  currentGuess: string | undefined;
}

export default function Row({ guess, currentGuess }: RowProps) {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((item, i) => (
          <div
            key={i}
            className={item.color}
          >
            {item.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = [...currentGuess];
    return (
      <div className="row current">
        {letters.map((item, i) => (
          <div
            key={i}
            className="filled"
          >
            {item}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {[...Array(5)].map((_, i) => (
        <div key={i} />
      ))}
    </div>
  );
}
