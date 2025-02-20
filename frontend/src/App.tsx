import { useEffect, useRef, useState } from 'react'
import axios from "axios";
import './App.css';

interface Solution {
  id: number;
  word: string;
}

export default function App() {
  const [solution, setSolution] = useState<Solution | null>(null);
  const fetched = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8000/solutions")
      .then((res) => {
        const solutions = res.data;
        setSolution(solutions);
        if (solutions.length > 0) {
          const id = Math.floor(Math.random() * solutions.length);
          setSolution(solutions[id]);
        }
      })
      .catch(err => console.error(err))
  }, [setSolution]);
  
  return (
    <>
      {solution && <div>{solution.word}</div>}
    </>
  )
}
