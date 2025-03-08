import { useEffect, useState } from 'react';
import { Letter } from '../types';
import { RowItem } from './RowItem';

interface RowProps {
  guess?: Letter[];
  currentGuess?: string;
}

export default function Row({ guess, currentGuess }: RowProps) {
  const [flipped, setFlipped] = useState<number[]>([]);

  useEffect(() => {
    if (!guess) return;

    const timeouts = guess.map((_, i) => {
      return setTimeout(() => {
        setFlipped((prev) => [...prev, i]);
      }, i * 300 + 300);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [guess])

  const getRowItems = () => {
    if (guess) {
      return guess.map((item, i) => (
        <RowItem
          key={i}
          variant={flipped.includes(i) ? item.color : 'current'}
          className="animate-flip"
          style={{ animationDelay: `${i * 300}ms` }}
        >
          {item.key}
        </RowItem>
      ))
    }

    if (currentGuess) {
      const letters = [...currentGuess].map((item, i) => (
        <RowItem key={i} variant="current">
          {item}
        </RowItem>
      ));

      const emptySlots = [...Array(5 - currentGuess.length)].map((_, i) => (
        <RowItem
          key={i + currentGuess.length}
          variant="default"
        />
      ));

      return [...letters, ...emptySlots];
    }

    return [...Array(5)].map((_, i) => (
      <RowItem key={i} variant="default" />
    ));
  };

  return (
    <div className="text-center flex justify-center">
      {getRowItems()}
    </div>
  );
}
