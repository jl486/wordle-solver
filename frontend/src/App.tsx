import { useEffect, useState } from "react";
import axios from "axios";
import { GameProvider } from "./contexts/GameContext";
import Game from "./components/Game";
import { Solution } from "./types";
import "./App.css";

export default function App() {
  const [solution, setSolution] = useState<Solution>();

  useEffect(() => {
    axios.get<Solution[]>("http://localhost:8000/solutions")
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
        className="w-full flex flex-row justify-between items-center
          h-14 bg-background-white dark:bg-background-dark
          border-b-[1px] border-border-light dark:border-border-dark
          tracking-wider font-bold text-3xl
        "
      >
        WORDLE
      </header>
      <Game solution={solution?.word} />
    </GameProvider>
  );
}
