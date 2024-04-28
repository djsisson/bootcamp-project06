import "./Total.css"
import { useRef, useEffect,useState } from "react";
import { useGameState } from "../../Context/gameStateContext.jsx";

const Total = () => {
    const gameState = useGameState().gamestats
    const refDisplay = useRef(0)
    const refOldDisplay = useRef(0)
    const [displayTotal, setDisplayTotal] = useState(0)
    

    useEffect(() => {
        refDisplay.current = gameState.currentscore
    },[gameState])


    useEffect(()=>{
        refOldDisplay.current = refDisplay.current
        const displayInterval = setInterval(()=>{
            const diff = Math.floor((refDisplay.current - refOldDisplay.current)/4)
            refOldDisplay.current += diff
            setDisplayTotal(Math.round(refOldDisplay.current))
        },100)
        return (()=> clearInterval(displayInterval))
    },[])

    return (<div className = "total">Total: {displayTotal}</div>)
}

export default Total