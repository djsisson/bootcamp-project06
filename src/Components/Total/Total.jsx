import "./Total.css"

import { useGameState } from "../../Context/gameStateContext.jsx";

const Total = () => {
    const gameState = useGameState().gamestats
    return (<div className = "total">Total: {gameState.currentscore}</div>)
}

export default Total