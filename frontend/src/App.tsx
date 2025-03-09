import { useEffect, useState } from 'react';
import axios from 'axios';

import Toolbar from './components/Toolbar';
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
      .catch((err) => console.error(err));
  }, [setSolution]);

  return (
    <GameProvider>
      <Toolbar />
      <Game solution={solution?.word} />
    </GameProvider>
  );
}
