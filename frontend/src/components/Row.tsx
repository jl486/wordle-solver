import { GuessItem } from "../types";

interface RowProps {
  guess: GuessItem[];
}

export default function Row({ guess }: RowProps) {
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

  return (
    <div className="row">
      {[...Array(5)].map((_, i) => (
        <div key={i} />
      ))}
    </div>
  );
}
