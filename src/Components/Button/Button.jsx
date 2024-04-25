import "./Button.css";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";

const Button = ({ c, x }) => {
  const gameStateDispatch = useGameStateDispatch();

  const onClick = (e) => {
    console.log(e);
  };

  return <button onClick={onClick}>{x.name}</button>;
};

export default Button;
