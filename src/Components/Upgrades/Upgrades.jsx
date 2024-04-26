import "./Upgrades.css";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";
import Button from "../Button/Button.jsx";
import {
  _gameObjects,
  hasResearch,
  canBuy,
} from "../../gameObjects/gameObjects.js";
import { useState, useEffect } from "react";

const Upgrades = () => {
  const [completedUpgrade, setCompletedUpgrade] = useState([]);
  const [unlockedUpgrade, setUnlockedUpgrade] = useState([]);
  const upgrades = useGameState().upgrades;
  const research = useGameState().researched;
  const score = useGameState().gamestats.currentscore;
  const dispatch = useGameStateDispatch();

  useEffect(() => {
    const completedUpgrades = _gameObjects.upgrades
      .filter((x) => upgrades.find((i) => x.id == i.id))
      .filter(
        (x) => upgrades.find((i) => x.id == i.id).level == x.levels.length - 1
      );
    setCompletedUpgrade(completedUpgrades);
    const unlockedUpgrades = _gameObjects.upgrades
      .map((x) => ({
        ...x,
        canResearch: hasResearch(research, x.requiredresearch),
      }))
      .filter((x) => x.canResearch == true)
      .filter((x) => !completedUpgrades.find((i) => x.id == i.id))
      .map((x) => ({
        ...x,
        canBuy: canBuy(x.levels[0].cost, score),
        currentlevel: 0,
      }));
    unlockedUpgrades.forEach((x) => {
      const currentlyUpgrading = upgrades.find((i) => x.id == i.id);
      if (currentlyUpgrading) {
        x.canBuy = canBuy(x.levels[currentlyUpgrading.level + 1].cost, score);
        x.currentlevel = currentlyUpgrading.level + 1;
      }
    });

    setUnlockedUpgrade(unlockedUpgrades);
  }, [score, research, upgrades]);

  const buyUpgrade = (x) => {
    dispatch({
      type: "buyUpgrade",
      value: x.id,
      currentlevel: x.currentlevel,
      level: x.levels[x.currentlevel],
      effecttype: x.type,
      effectid: x.effectitemid,
    });
  };

  return (
    <div className="upgrades">
      <h1 className="upgradeTitle">Upgrades</h1>
      <div className="upgradeContainer">
        {completedUpgrade.map((x) => (
          <Button key={x.id} x={x} c={true}></Button>
        ))}
        {unlockedUpgrade.map((x) => (
          <Button
            key={x.id}
            x={x}
            c={false}
            b={!x.canBuy}
            f={buyUpgrade}
          ></Button>
        ))}
      </div>
    </div>
  );
};

export default Upgrades;
