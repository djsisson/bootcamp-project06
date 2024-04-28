import "./Container.css";
import Button from "../Button/Button";
import { useGameState } from "../../Context/gameStateContext.jsx";
import { _gameObjects } from "../../gameObjects/gameObjects.js";
import { useEffect, useState } from "react";

const Container = ({ type }) => {
  const [buttonList, setButtonList] = useState([]);
  const inven = useGameState().inventory;
  const research = useGameState().researched;

  useEffect(() => {
    if (type != "Inventory") return;
    setButtonList(inven.filter((x) => x.quantity != 0));
  }, [inven]);

  useEffect(() => {
    let filteredList = [];
    switch (type) {
      case "Inventory": {
        return;
      }
      case "Research": {
        filteredList = _gameObjects.research;
        break;
      }
      case "Upgrades": {
        filteredList = _gameObjects.upgrades;
        break;
      }
      case "Shop": {
        filteredList = _gameObjects.shopitems;
        break;
      }
      default: {
        return;
      }
    }
    setButtonList(
      filteredList.filter((x) => hasResearched(x.requiredresearch))
    );
  }, [research]);

  const hasResearched = (requireResearch = []) => {
    const checkForResearch = requireResearch.filter(
      (x) => !research.includes(x)
    );
    return checkForResearch.length == 0;
  };

  return (
    <div className={`${type} container`}>
      <h1>{type}</h1>
      <div>
        {buttonList.toReversed().map((x) => 
          <Button type={type} x={x} key={x.id} />
        )}
      </div>
    </div>
  );
};

export default Container;
