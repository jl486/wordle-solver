import { createContext, Dispatch, useContext, useReducer } from "react";
import { formatGuess, validateGuess } from "../utils/guessUtils";
import { GameState, Action } from "../types";

const initialState: GameState = {
  currentGuess: "",
  history: [...Array(6)],
  tries: 0,
  solution: undefined,
  isSolved: false
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
      const err = validateGuess(state);
      if (err) {
        console.log(err);
        return state;
      }

      if (!state.solution) {
        return state;
      }

      console.log(state.history);

      return {
        ...state,
        history: [
          ...state.history.slice(0, state.tries),
          formatGuess(state.currentGuess, state.solution),
          ...state.history.slice(state.tries + 1)
        ],
        currentGuess: "",
        tries: state.tries + 1,
        isSolved: state.currentGuess === state.solution
      };
    }
    case "SET_SOLUTION": {
      return {
        ...state,
        solution: action.solution
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
