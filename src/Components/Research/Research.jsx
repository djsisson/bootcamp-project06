import "./Research.css";
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

const Research = () => {
  const [completedResearch, setCompletedResearch] = useState([]);
  const [unlockedResearch, setUnlockedResearch] = useState([]);
  const research = useGameState().researched;
  const inven = useGameState().inventory;
  const score = useGameState().gamestats.currentscore;
  const dispatch = useGameStateDispatch();

  const buyResearch = (x) => {
    dispatch({
      type: "buyResearch",
      value: x.id,
      cost: x.cost,
      items: x.requireditems,
    });
  };

  useEffect(() => {
    const completedResearch = _gameObjects.research
      .filter((x) => research.includes(x.id))
      .map((x) => ({ ...x, completed: true }));
    setCompletedResearch(completedResearch);
  }, [research]);

  useEffect(() => {
    const newResearch = _gameObjects.research
      .filter((x) => !research.includes(x.id))
      .map((x) => ({
        ...x,
        canResearch: hasResearch(research, x.requiredresearch),
      }))
      .filter((x) => x.canResearch == true)
      .map((x) => ({
        ...x,
        canBuy: canBuy(x.cost, score, x.requireditems, inven),
      }));
    setUnlockedResearch(newResearch);
  }, [research, score]);

  return (
    <div className="research">
      <h1 className="reasearchTitle">Research</h1>
      <div className="researchContainer">
        {completedResearch.map((x) => (
          <Button key={x.id} x={x} c={true}></Button>
        ))}
        {unlockedResearch.map((x) => (
          <Button
            key={x.id}
            x={x}
            c={false}
            b={!x.canBuy}
            f={buyResearch}
          ></Button>
        ))}
      </div>
    </div>
  );
};

export default Research;
