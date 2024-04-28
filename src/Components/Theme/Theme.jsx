import "./Theme.css";
import {
  useGameState,
  useGameStateDispatch,
} from "../../Context/gameStateContext.jsx";
import { useEffect } from "react";

const Theme = () => {
  const theme = useGameState().theme;
  const dispatch = useGameStateDispatch();
  const themes = [
    "Aqua",
    "DeepPink",
    "LightGreen",
    "Orange",
    "Red",
    "Tomato",
    "White",
    "Yellow",
  ];

  const onClick = (e) => {
    dispatch({
      type: "changeTheme",
      value: e.target.innerText,
    });
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--bgColour", theme);
  }, [theme]);
  return (
    <div className="theme-container">
      Theme
      <div className="theme-menu">
        {themes.map((x) => {
          return (
            <div
              key={x}
              style={{ color: x }}
              onClick={onClick}
              className="themebutton"
            >
              {x}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Theme;
