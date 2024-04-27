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

function buyItems(items = [], inven = []) {
  items.forEach((item) => {
    let itemtoremove = inven.find((x) => x.id == item.id);
    const newInvenItem = { ...itemtoremove };
    newInvenItem.quantity -= item.quantity;
    itemtoremove = { ...newInvenItem };
  });
}

function upgradeItem(item, stats) {
  item.baseValue += stats.baseValue;
  item.critChance += stats.critChance;
  item.critDamage += stats.critDamage;
}

function gameStateReducer(gameState, action) {
  const inven = gameState.inventory;
  const stats = gameState.gamestats;
  const research = gameState.researched;
  const upgrades = gameState.upgrades;
  const clickstats = gameState.clickstats;

  switch (action.type) {
    case "click": {
      const newStats = { ...stats };
      newStats.totalclicks += 1;
      newStats.currentscore += action.value;
      return {
        ...gameState,
        gamestats: { ...newStats },
      };
    }
    case "buyResearch": {
      buyItems(action.items, inven);
      const newStats = { ...stats };
      newStats.currentscore -= action.cost;
      newStats.totalspent += action.cost;
      return {
        ...gameState,
        researched: [...research, action.value],
        gamestats: {
          ...newStats,
        },
        inventory: [...inven],
      };
    }
    case "buyUpgrade": {
      const newStats = { ...stats };
      const newUpgrades = [...upgrades];
      const newInven = [...inven];
      const newClickStats = { ...clickstats };

      newStats.currentscore -= action.level.cost;
      newStats.totalspent += action.level.cost;

      const alreadyUpgrading = newUpgrades.findIndex(
        (x) => x.id == action.value
      );
      if (alreadyUpgrading != -1) {
        const newUpgradeItem = { ...newUpgrades[alreadyUpgrading] };
        newUpgradeItem.level++;
        newUpgrades[alreadyUpgrading] = { ...newUpgradeItem };
      } else {
        newUpgrades.push({ id: action.value, level: action.newlevel });
      }

      if (action.effecttype == 0) {
        upgradeItem(newClickStats, action.level.upgrade);
      } else {
        const inInventory = newInven.findIndex((x) => x.id == action.effectid);
        if (inInventory != -1) {
          const newInvenItem = { ...newInven[inInventory] };
          const newCps = { ...newInvenItem.cps };
          upgradeItem(newCps, action.level.upgrade);
          newInvenItem.cps = { ...newCps };
          newInven[inInventory] = newInvenItem;
        } else {
          const newInvenItem = _gameObjects.shopitems.find(
            (x) => x.id == action.effectid
          );
          const newCps = { ...newInvenItem.cps };
          upgradeItem(newCps, action.level.upgrade);
          newInven.push({
            id: action.effectid,
            name: newInvenItem.name,
            quantity: 0,
            cps: { ...newCps },
          });
        }
      }
      return {
        ...gameState,
        clickstats: { ...newClickStats },
        gamestats: { ...newStats },
        upgrades: [...newUpgrades],
        inventory: [...newInven],
      };
    }
    case "buyItem": {
      const newStats = { ...stats };
      const newInven = [...inven];
      newStats.currentscore -= action.cost;
      newStats.totalspent += action.cost;
      const inInventory = newInven.findIndex((x) => x.id == action.value);
      if (inInventory != -1) {
        const newInvenItem = { ...newInven[inInventory] };
        newInvenItem.quantity++;
        newInven[inInventory] = newInvenItem;
      } else {
        const newInvenItem = _gameObjects.shopitems.find(
          (x) => x.id == action.value
        );
        const newCps = { ...newInvenItem.cps };
        newInven.push({
          id: action.value,
          name: newInvenItem.name,
          quantity: 1,
          cps: { ...newCps },
        });
      }
      return {
        ...gameState,
        gamestats: { ...newStats },
        inventory: [...newInven],
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
