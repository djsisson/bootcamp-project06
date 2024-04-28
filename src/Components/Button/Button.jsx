import "./Button.css";
import Tooltip from "../Tooltip/Tooltip.jsx";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";
import { useEffect, useState, useId } from "react";

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
  const [displayText, setDisplayText] = useState("");
  const [tooltipText, setToolTipText] = useState([]);
  const buttonLabel = useId();

  useEffect(() => {
    let textToDisplay = "";
    let toolTip = [];
    switch (type) {
      case "Research": {
        if (completed) {
          textToDisplay = `${x.name} Research Completed`;
          toolTip = [`${x.name} Completed`];
        } else {
          textToDisplay = `${x.name} Research Cost:${x.cost}`;
          toolTip = [
            `${x.name}`,
            `${x.description} Cost:${x.cost}`,
            `${x.requiredtooltip}`,
          ];
        }
        break;
      }
      case "Upgrades": {
        if (completed) {
          textToDisplay = `${x.name} Upgrade Completed`;
          toolTip = [`${x.name} Completed`];
        } else {
          textToDisplay = `${x.name} (${nextLevel + 1}) Cost: ${
            x.levels[nextLevel].cost
          }`;
          toolTip = [
            `${x.name} Upgrade`,
            `${x.description} Cost: ${x.levels[nextLevel].cost}`,
          ];
        }
        break;
      }
      case "Shop": {
        if (quantity == x.max) {
          textToDisplay = `${x.name} Max: ${quantity}`;
          toolTip = [`${x.name} Qty: ${quantity}`];
        } else {
          textToDisplay = `${x.name} (${quantity}) Cost: ${
            x.cost * Math.pow(x.multiplier, quantity)
          }`;
          toolTip = [
            `${x.name}`,
            `Cost: ${x.cost * Math.pow(x.multiplier, quantity)}`,
            `${x.requiredtooltip}`,
          ];
        }
        break;
      }
      case "Inventory": {
        textToDisplay = `${x.name} Qty: ${quantity}`;
        toolTip = [`${x.name} Qty: ${quantity}`];
        break;
      }
      default: {
        return;
      }
    }
    setDisplayText(textToDisplay);
    setToolTipText(toolTip);
  }, [nextLevel, canBuy, completed, quantity]);

  useEffect(() => {
    if (completed) return;
    let canBuy = true;
    if (type != "Inventory") {
      x.requireditems.forEach((item) => {
        let invenItem = inven.find((x) => x.id == item.id);
        if (invenItem ? invenItem.quantity < item.quantity : true) {
          canBuy = false;
        }
      });
    }
    let calcCost = 0;
    switch (type) {
      case "Research": {
        setCompleted(research.includes(x.id));
        calcCost = x.cost;
        break;
      }
      case "Upgrades": {
        calcCost = x.levels[nextLevel].cost;
        let isCompleted = false;
        const currentUpgrade = upgrades.find((item) => x.id == item.id);
        if (currentUpgrade) {
          isCompleted = currentUpgrade.level == x.levels.length - 1;
          setNextLevel(currentUpgrade.level + 1);
        }
        setCompleted(isCompleted);
        break;
      }
      case "Shop": {
        calcCost = x.cost * Math.pow(x.multiplier, quantity);
        const currentShopItem = inven.find((item) => x.id == item.id);
        if (currentShopItem) {
          if (currentShopItem.quantity == x.max) canBuy = false;
          setQuantity(currentShopItem.quantity);
        }
        break;
      }
      case "Inventory": {
        setQuantity(x.quantity);
        canBuy = false;
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
  }, [score, inven, nextLevel, quantity]);

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
        return;
      }
      case "Shop": {
        dispatch({
          type: "buyItem",
          value: x.id,
          cost: x.cost * Math.pow(x.multiplier, quantity),
          items: x.requireditems,
        });
        return;
      }
      default: {
        return;
      }
    }
  };

  return (
    <Tooltip content={tooltipText} direction="top">
      <div className="buttonItem">
        <button
          id={buttonLabel}
          title={x.name}
          type="button"
          className={`btn${canBuy ? " canBuy" : ""}${
            completed ? " completed" : ""
          }`}
          onClick={onClick}
          disabled={completed || !canBuy}
        ></button>
        <label htmlFor={buttonLabel}>{displayText}</label>
      </div>
    </Tooltip>
  );
};

export default Button;
