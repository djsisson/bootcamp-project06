import { useEffect } from "react";
import "./VisualScore.css";

const VisualScore = ({ className, x, remove, type }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      remove(x.id);
    }, 3000 + x.delay);
    return () => clearTimeout(timeout);
  }, []);


  return (
    <div
      className={`${className} ${type}${x.crit ? " crit" : ""}`}
      style={{
        "--rndLeft": `${x.rndLeft}px`,
        "--rndTop": `${x.rndTop}px`,
        "--delay": `${x.delay}ms`,
      }}
    >
      +{x.value}
    </div>
  );
};

export default VisualScore;
