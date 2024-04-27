import "./Button.css";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";
import { useEffect, useState } from "react";

const Button = ({ type, x }) => {
  const dispatch = useGameStateDispatch();
  const score = useGameState().gamestats.currentscore;
  const research = useGameState().researched;
  const upgrades = useGameState().upgrades;
  const inven = useGameState().inventory;
  const [completed, setCompleted] = useState(false);
  const [canBuy, setCanBuy] = useState(false);
  const [nextLevel, setNextLevel] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (type == "Inventory") return;
    if (completed) return;
    let canBuy = true;
    x.requireditems.forEach((item) => {
      let invenItem = inven.find((x) => x.id == item.id);
      if (invenItem ? invenItem.quantity < item.quantity : true) {
        canBuy = false;
      }
    });
    let calcCost = 0;
    switch (type) {
      case "Research": {
        calcCost = x.cost;
        break;
      }
      case "Upgrades": {
        calcCost = x.levels[nextLevel].cost;
        break;
      }
      case "Shop": {
        calcCost = Math.pow(x.multiplier, quantity);
        break;
      }
      default: {
        break;
      }
    }
    if (calcCost > score) {
      canBuy = false;
    }
    setCanBuy(canBuy);
  }, [score, inven, nextLevel]);

  useEffect(() => {
    if (type == "Inventory") return;
    switch (type) {
      case "Research": {
        setCompleted(research.includes(x.id));
        return;
      }
      case "Upgrades": {
        let isCompleted = false;
        const currentUpgrade = upgrades.find((item) => x.id == item.id);
        if (currentUpgrade) {
          isCompleted = currentUpgrade.level == x.levels.length - 1;
          setNextLevel(currentUpgrade.level + 1);
        }
        setCompleted(isCompleted);
        return;
      }
      case "Shop": {
        let isCompleted = false;
        const currentShopItem = inven.find((item) => x.id == item.id);
        if (currentShopItem) {
          isCompleted = currentShopItem.quantity == x.max;
          setQuantity(currentShopItem.quantity);
        }
        setCompleted(isCompleted);
        return;
      }
      default: {
        return;
      }
    }
  }, [research, upgrades, inven]);

  const onClick = (e) => {
    switch (type) {
      case "Research": {
        dispatch({
          type: "buyResearch",
          value: x.id,
          cost: x.cost,
          items: x.requireditems,
        });
        return;
      }
      case "Upgrades": {
        dispatch({
          type: "buyUpgrade",
          value: x.id,
          newlevel: nextLevel,
          level: x.levels[nextLevel],
          effecttype: x.type,
          effectid: x.effectitemid,
        });
        return
      }
      case "Shop": {
        dispatch({
          type: "buyItem",
          value: x.id,
          cost: Math.pow(x.multiplier, quantity),
        });
        return;
      }
      default: {
        return;
      }
    }
  };

  return (
    <button onClick={onClick} disabled={completed || !canBuy}>
      {x.name}+{canBuy ? "true" : "false"}
    </button>
  );
};

export default Button;
