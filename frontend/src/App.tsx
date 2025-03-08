import { useEffect, useState } from 'react';
import axios from 'axios';

import Game from './components/Game';
import { GameProvider } from './contexts/GameContext';
import { Solution } from './types';
import './App.css';

export default function App() {
  const [solution, setSolution] = useState<Solution>();

  useEffect(() => {
    axios.get<Solution[]>('http://localhost:8000/solutions')
      .then((res) => {
        const solutions: Solution[] = res.data;
        if (solutions.length > 0) {
          const id = Math.floor(Math.random() * solutions.length);
          setSolution(solutions[id]);
        }
      })
      .catch((err) => console.error(err))
  }, [setSolution]);

  return (
    <GameProvider>
      <header
        className="
          w-full flex flex-row justify-between items-center h-14
          bg-background-white dark:bg-background-dark
          border-b-[1px] border-border-light dark:border-border-dark
        "
      >
        <button className="p-3 mx-1">
          <svg className="fill-black dark:fill-white" width="32" height="32" viewBox="0 0 8.467 8.467">
            <rect width="5.444" height=".646" x="1.511" y="5.383" ry=".323" />
            <rect width="5.444" height=".646" x="1.511" y="3.91" ry=".323" />
            <rect width="5.444" height=".646" x="1.511" y="2.437" ry=".323" />
          </svg>
        </button>
        <h1 className="tracking-wider font-bold text-3xl">WORDLE</h1>
      </header>
      <Game solution={solution?.word} />
    </GameProvider>
  );
}
