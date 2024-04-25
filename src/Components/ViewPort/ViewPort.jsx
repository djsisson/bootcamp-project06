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
  const gamestate = useGameState().clickstats;

  const onClick = async (e) => {
    e.target.classList.toggle("shake");
    const getCalcDamage = calcdamage(gamestate);
    setClickValues((x) => [
      ...x,
      {
        id: nextId,
        crit: getCalcDamage.crit,
        value: getCalcDamage.totaldamage,
        rndLeft: Math.floor(Math.random() * 40 - 20),
        rndTop: Math.floor(Math.random() * 40 - 20),
        delay: 0,
      },
    ]);
    setNextId((x) => (x + 1) % 100);
    dispatch({
      type: "click",
      value: getCalcDamage.totaldamage,
    });
  };

  const removeClickValue = (id) => {
    setClickValues((x) => x.filter((i) => i.id != id));
  };

  return (
    <div className="viewport">
      {clickValues.map((x) => {
        return (
          <VisualScore
            className="floatingclicktext"
            x={x}
            key={x.id}
            remove={removeClickValue}
          />
        );
      })}

      <div className="asteroid" onClick={onClick}></div>
    </div>
  );
};

export default ViewPort;
