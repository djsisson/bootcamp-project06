import { useState } from "react";
import "./ViewPort.css";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";
import VisualScore from "../VisualScore/VisualScore.jsx";
import { calcdamage } from "../../gameObjects/gameObjects.js";

const ViewPort = () => {
  const [clickValues, setClickValues] = useState([]);
  const [nextId, setNextId] = useState(0);
  const dispatch = useGameStateDispatch();
  const gamestate = useGameState().clickstats
  const onClick = async (e) => {
    e.target.classList.toggle("shake");
    const getCalcDamage = calcdamage(gamestate);
    setClickValues((x) => [...x, { id: nextId, value: getCalcDamage }]);
    setNextId((x) => (x + 1) % 100);
    dispatch({
      type: "click",
      value: getCalcDamage.totaldamage,
    });
    await delay(3000);
    setClickValues((x) => x.filter((i) => i.id != nextId));
  };

  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  return (
    <div className="viewport">
      {clickValues.map((x) => {
        return (
          <VisualScore
            className="floatingclicktext"
            value={x.value.totaldamage}
            crit={x.value.crit}
            key={x.id}
          />
        );
      })}

      <div className="asteroid" onClick={onClick}></div>
    </div>
  );
};

export default ViewPort;
