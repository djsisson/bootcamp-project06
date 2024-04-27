import "./Stats.css";
import { useGameState } from "../../Context/gameStateContext.jsx";

const Stats = () => {
  const gameState = useGameState();

  return (
    <div className="stats">
      <div>Total Clicks: {gameState.gamestats.totalclicks}</div>
      <div>Total Spent: {gameState.gamestats.totalspent}</div>
      <div>Average Click Value: {gameState.gamestats.averageclickvalue}</div>
      <div>Average CPS Value: {gameState.gamestats.currentAveragecps}</div>
    </div>
  );
};

export default Stats;
