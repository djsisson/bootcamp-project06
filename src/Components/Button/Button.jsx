import "./Button.css";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";

const Button = ({ b, c, x, f }) => {
  const gameStateDispatch = useGameStateDispatch();

  const onClick = (e) => {
    f(x);
  };

  return (
    <button disabled={c || b} onClick={onClick}>
      {x.name}
    </button>
  );
};

export default Button;
