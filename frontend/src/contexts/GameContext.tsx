import { createContext, Dispatch, useContext, useReducer } from "react";
import { formatGuess } from "../utils/formatGuess";

interface FormattedGuessItem {
  key: string;
  color: string
}

interface GameState {
  currentGuess: string;
  history: string[];
  formattedHistory: FormattedGuessItem[][],
  tries: number;
  solution: string | undefined;
}

interface Action {
  type: string;
  payload?: string;
  solution?: string;
}

const initialState: GameState = {
  currentGuess: "",
  history: [],
  formattedHistory: [],
  tries: 0,
  solution: undefined
};

const GameContext = createContext<GameState>(initialState);
const GameDispatchContext = createContext<Dispatch<Action>>(() => { });

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}

function gameReducer(state: GameState, action: Action) {
  switch (action.type) {
    case "ADD_LETTER": {
      if (state.currentGuess.length < 5) {
        return {
          ...state,
          currentGuess: state.currentGuess + action.payload
        };
      }
      return state;
    }
    case "DELETE_LETTER": {
      return {
        ...state,
        currentGuess: state.currentGuess.slice(0, -1),
      };
    }
    case "ADD_GUESS": {
      if (!state.solution) {
        return state;
      }
      
      if (state.tries >= 6) {
        console.log("No more guesses");
        return state;
      }

      if (state.currentGuess.length !== 5) {
        console.log("Guess must be 5 characters long");
        return state;
      }

      if (state.history.includes(state.currentGuess)) {
        console.log("You already tried that word");
        return state;
      }

      return {
        ...state,
        history: [...state.history, state.currentGuess],
        formattedHistory: [
          ...state.formattedHistory,
          formatGuess(state.currentGuess, state.solution)
        ],
        currentGuess: "",
        tries: state.tries + 1
      }
    }
    case "SET_SOLUTION": {
      return {
        ...state,
        solution: action.solution
      }
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
