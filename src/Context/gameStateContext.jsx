import { createContext, useContext, useReducer, useEffect } from "react";
import {_gameState} from "../gameObjects/gameObjects.js";

const GameStateContext = createContext(null);

const GameStateDispatchContext = createContext(null);

export function GameStateProvider({ children }) {
  const [gameState, dispatch] = useReducer(gameStateReducer, null, () => {
    const localState = localStorage.getItem("ReactAsteroidMiner");
    return localState ? JSON.parse(localState) : _gameState;
  });

  useEffect(() => {
    localStorage.setItem("ReactAsteroidMiner", JSON.stringify(gameState));
  }, [gameState]);

  return (
    <GameStateContext.Provider value={gameState}>
      <GameStateDispatchContext.Provider value={dispatch}>
        {children}
      </GameStateDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameStateContext);
}

export function useGameStateDispatch() {
  return useContext(GameStateDispatchContext);
}

function gameStateReducer(gameState, action) {
  switch (action.type) {
    case "click": {
      const currentClicks = gameState.gamestats.totalclicks
      const clickToAdd = gameState.gamestats.currentscore + action.value
      return {...gameState, "gamestats": {...gameState.gamestats,"totalclicks": currentClicks + 1,"currentscore": clickToAdd}}
    }
    case "buyResearch": {
      return {...gameState}
    }
    case "buyUpgrade": {
      return {...gameState}
    }
    case "buyItem": {
      return {...gameState}
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
