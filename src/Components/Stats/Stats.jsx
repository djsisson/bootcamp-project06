import "./Stats.css";
import { useGameState } from "../../Context/gameStateContext.jsx";
import { AverageDamage } from "../../gameObjects/gameObjects.js";

const Stats = () => {
  const gameState = useGameState();
  return (
    <div className="stats">
      <div>Total Clicks: {gameState.gamestats.totalclicks}</div>
      <div>Total Spent: {gameState.gamestats.totalspent}</div>
      <div>Average Click Value: {AverageDamage(gameState.clickstats)}</div>
      <div>Average CPS Value: {gameState.gamestats.currentAveragecps}</div>
    </div>
  );
};

export default Stats;
