import { createContext, useContext, useReducer, useEffect } from "react";
import { _gameObjects, _gameState } from "../gameObjects/gameObjects.js";

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

function buyItem(items = [], inven = []) {
  const newItems = items.forEach((item) => {
    let itemtoremove = inven.find((x) => x.id == item.id);
    itemtoremove.quantity -= item.quantity;
  });
  return newItems || [];
}

function upgradeItem(item, stats) {
  const newItem = {
    baseValue: item.baseValue + stats.baseValue,
    critChance: item.critChance + stats.critChance,
    critDamage: item.critDamage + stats.critDamage,
  };
  return { ...newItem };
}

function gameStateReducer(gameState, action) {
  switch (action.type) {
    case "click": {
      const newStats = { ...gameState.gamestats };
      newStats.totalclicks += 1;
      newStats.currentscore += action.value;
      return {
        ...gameState,
        gamestats: { ...newStats },
      };
    }
    case "buyResearch": {
      const newInven = buyItem([...action.items], [...gameState.inventory]);
      const newStats = { ...gameState.gamestats };
      newStats.currentscore -= action.cost;
      newStats.totalspent += action.cost;
      return {
        ...gameState,
        researched: [...gameState.researched, action.value],
        gamestats: {
          ...newStats,
        },
        inventory: [...newInven],
      };
    }
    case "buyUpgrade": {
      const newStats = { ...gameState.gamestats };
      newStats.currentscore -= action.level.cost;
      newStats.totalspent += action.level.cost;
      const newUpgrades = [...gameState.upgrades];
      const newInven = [...gameState.inventory];
      let newClickStats = { ...gameState.clickstats };
      const alreadyUpgrading = newUpgrades.findIndex(
        (x) => x.id == action.value
      );
      if (alreadyUpgrading != -1) {
        newUpgrades.splice(alreadyUpgrading, 1);
      }
      const newInvenItem = {
        id: action.effectid,
        quantity: 0,
        cps: {},
      };
      if (action.effecttype == 0) {
        newClickStats = upgradeItem(newClickStats, action.level.upgrade);
      } else {
        const inInventory = newInven.findIndex((x) => x.id == action.effectid);
        console.log(inInventory);
        if (inInventory != -1) {
          newInvenItem.qty = newInven[inInventory].quantity;
          const newCps = {
            ...upgradeItem(
              { ...newInven[inInventory].cps },
              action.level.upgrade
            ),
          };
          newInven.splice(inInventory, 1);
          newInvenItem.cps = {
            ...newCps,
          };
        } else {
          const findItem = _gameObjects.shopitems.find(
            (x) => x.id == action.effectid
          );
          newInvenItem.cps = { ...findItem.cps };
        }
        newInven.push({ ...newInvenItem });
      }
      return {
        ...gameState,
        clickstats: { ...newClickStats },
        gamestats: { ...newStats },
        upgrades: [
          ...newUpgrades,
          { id: action.value, level: action.currentlevel },
        ],
        inventory: [...newInven],
      };
    }
    case "buyItem": {
      return { ...gameState };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
