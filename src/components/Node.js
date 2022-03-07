import React from "react"
import "./Node.css"

const Node = ({isStart, isEnd, row, col, isWall, isAisle, isPath, title }) =>{
    const classes = isStart ? "node-start" : isWall? "iswall": isAisle? "isaisle": isPath? "ispath" : isEnd ? "node-end": "";
    const name = title ? title: "";
    return(
        <div className={`node ${classes}`} id={`node-${col}-${row}`}><span class="title">{name}</span></div>
    )
}

export default Node;
