import { useState } from "react";
import "./ViewPort.css";
import VisualScore from "../VisualScore/VisualScore.jsx";
import React from "react";

const ViewPort = () => {
  const [clickValues, setClickValues] = useState([]);
  const [nextId, setNextId] = useState(1);

  const onClick = async (e) => {
    e.target.classList.toggle("shake");

    setClickValues((x) => [...x, { id: nextId, value: nextId }]);
    setNextId((x) => (x + 1) % 100);
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
            value={x.value}
            key={x.id}
          />
        );
      })}

      <div className="asteroid" onClick={onClick}></div>
    </div>
  );
};

export default ViewPort;
