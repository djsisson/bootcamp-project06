import React, { useState } from "react";
import "./Tooltip.css";

const Tooltip = (props) => {
  let timeout;
  let display
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
    display = setTimeout (()=>{
      hideTip()
    },3000)
  };

  const hideTip = () => {
    clearTimeout(timeout);
    clearTimeout(display);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          {/* Content */}
          {props.content.map((x) => {
            return (
                <div key={x}>{x}</div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
