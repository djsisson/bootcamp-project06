import { useState, useEffect, useRef } from "react";
import "./ViewPort.css";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";
import VisualScore from "../VisualScore/VisualScore.jsx";
import { calcdamage } from "../../gameObjects/gameObjects.js";

const ViewPort = () => {
  const [clickValues, setClickValues] = useState([]);
  const [cpsValues, setCpsValues] = useState([]);
  const [cps, SetCps] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [nextCpsId, setNextCpsId] = useState(0);
  const refCps = useRef([]);
  const dispatch = useGameStateDispatch();
  const gamestate = useGameState().clickstats;
  const inven = useGameState().inventory;

  useEffect(() => {
    const newValues = [];
    inven.forEach((x) => {
      for (let i = 0; i < x.quantity; i++) {
        newValues.push(x.cps);
      }
    });
    refCps.current = newValues;
  }, [inven]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedAverageDmg = refCps.current.map((x) => ({
        ...calcdamage(x),
      }));

      SetCps([...updatedAverageDmg]);
      dispatch({
        type: "addCps",
        value: updatedAverageDmg.reduce((i, x) => i + x.totaldamage, 0),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let nextId = nextCpsId;
    const cpsToAdd = cps.map((x, i) => ({
      ...x,
      id: i + nextId,
      value: x.totaldamage,
      rndLeft: Math.floor(Math.random() * 40 - 20),
      rndTop: Math.floor(Math.random() * 40 - 20),
      delay: Math.floor(Math.random() * 500),
    }));
    setCpsValues((x) => [...x, ...cpsToAdd]);
    setNextCpsId((x) => (x + cps.length) % 1000);
  }, [cps]);

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

  const removeCpsValue = (id) => {
    setCpsValues((x) => x.filter((i) => i.id != id));
  };

  return (
    <div className="viewport">
      {clickValues.map((x) => {
        return (
          <VisualScore
            className="floatingtext"
            x={x}
            key={x.id}
            remove={removeClickValue}
            type="click"
          />
        );
      })}
      <div className="asteroid" onClick={onClick}></div>
      {cpsValues.map((x) => {
        return (
          <VisualScore
            className="floatingtext"
            x={x}
            key={x.id}
            remove={removeCpsValue}
            type="cps"
          />
        );
      })}
    </div>
  );
};

export default ViewPort;
