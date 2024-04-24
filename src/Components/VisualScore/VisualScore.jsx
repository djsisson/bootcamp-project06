import {useEffect, useState} from "react"
import "./VisualScore.css"

const VisualScore = ({className, value}) => {
const [rndLeft, setRndLeft] = useState(0)
const [rndTop, setRndTop] = useState(0)

useEffect(() => {
    setRndLeft(Math.floor(Math.random() * 40 - 20))
    setRndTop(Math.floor(Math.random() * 40 - 20))
}, [])

    return (<div className={className} style={{"--rndLeft": `${rndLeft}px`, "--rndTop": `${rndTop}px`}}>+{value}</div>)
}

export default VisualScore