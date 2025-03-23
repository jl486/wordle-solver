import axios from 'axios';
import { useEffect, useState } from 'react';

import Game from './components/Game';
import Toolbar from './components/Toolbar';
import { GameProvider } from './contexts/GameContext';
import { Solution } from './types';

import './App.css';

export default function App() {
  const [solution, setSolution] = useState<Solution>();
  const [result, setResult] = useState<{ output: number } | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/solutions')
      .then((response) => {
        const solutions: Solution[] = response.data;
        if (solutions.length > 0) {
          const id = Math.floor(Math.random() * solutions.length);
          const selectedSolution = solutions[id];
          setSolution(selectedSolution);
        }
      })
      .catch((error) => console.error(error));
  }, [setSolution]);

  useEffect(() => {
    if (solution) {
      axios.get('http://localhost:8000/solver')
        .then((response) => {
          setResult(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [solution]);

  return (
    <GameProvider>
      <Toolbar />
      <Game solution={solution?.word} />
      {result && (
        <div>
          <h3>Python Result:</h3>
          <pre>{result.output}</pre>
        </div>
      )}
    </GameProvider>
  );
}
