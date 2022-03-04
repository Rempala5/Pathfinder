import React from "react"
import "./Node.css"

const Node = ({isStart, isEnd, row, col, isWall, title }) =>{
    const classes = isStart ? "node-start" : isWall? "iswall": isEnd ? "node-end": "";
    const name = title ? title: "";
    return(
        <div className={`node ${classes}`} id={`node-${col}-${row}`}>{name}</div>
    )
}

export default Node;