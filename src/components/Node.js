import React from "react"
import "./Node.css"

const Node = ({isStart, isEnd, row, col, isWall }) =>{
    const classes = isStart ? "node-start" : isWall? "iswall": isEnd ? "node-end": "";
    return(
        <div className={`node ${classes}`} id={`node-${col}-${row}`}></div>
    )
}

export default Node;