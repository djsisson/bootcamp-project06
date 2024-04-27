import "./Stats.css";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";
import { averageDamage } from "../../gameObjects/gameObjects.js";
import { useEffect } from "react";

const Stats = () => {
  const gameState = useGameState();
  const dispatch = useGameStateDispatch();
  const inven = useGameState().inventory;

  useEffect(() => {
    const updatedAverageDmg = inven.reduce(
      (i, x) => i + x.quantity * averageDamage(x.cps),
      0
    );
    dispatch({
      type: "updateAverage",
      value: updatedAverageDmg,
    });
  }, [inven]);

  return (
    <div className="stats">
      <div>Total Clicks: {gameState.gamestats.totalclicks}</div>
      <div>Total Spent: {gameState.gamestats.totalspent}</div>
      <div>Average Click Value: {averageDamage(gameState.clickstats)}</div>
      <div>Average CPS Value: {gameState.gamestats.currentAveragecps}</div>
    </div>
  );
};

export default Stats;
