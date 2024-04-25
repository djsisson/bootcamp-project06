import "./Research.css";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";
import Button from "../Button/Button.jsx"
import {
  _gameObjects,
  hasResearch,
  canBuy,
} from "../../gameObjects/gameObjects.js";

const Research = () => {
  const gameState = useGameState().researched;
  const inven = useGameState().inventory;
  const score = useGameState().gamestats.currentscore;

  const getCompletedResearch = () => {
    const completedResearch = _gameObjects.research
      .filter((x) => gameState.includes(x.id))
      .map((x) => ({ ...x, completed: true }));
    return completedResearch;
  };
  const getOtherResearch = () => {
    const newResearch = _gameObjects.research
      .filter((x) => !gameState.includes(x.id))
      .map((x) => ({
        ...x,
        canResearch: hasResearch(gameState, x.requiredresearch),
      }))
      .filter((x) => x.canResearch == true)
      .map((x) => ({
        ...x,
        canBuy: canBuy(x.cost, score, x.requireditems, inven),
      }));
    return newResearch || [];
  };
  return (
    <div className="research">
      <h1>Research</h1>
      <div className="researchContainer">
        {getCompletedResearch().map((x) => (
          <Button key={x.id} x={x} c={true}></Button>
        ))}
        {getOtherResearch().map((x) => (
          <Button key={x.id} x={x} c={false}></Button>
        ))}
      </div>
    </div>
  );
};

export default Research;
