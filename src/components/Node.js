import React from "react"
import "./Node.css"

const Node = ({isStart, isEnd, row, col, isWall, isAisle, isPath, title, isPickupTile }) =>{
    const classes = isStart ? "node-start" : isWall? "iswall": isAisle? "isaisle": isPath? "ispath" : isEnd ? "node-end": "";
    const name = title ? title: "";

    const getDetails = () =>{
        alert(title);
    }

    if(isPickupTile){

        return (
        <div onClick = {getDetails} className={`node ${classes}`} id={`node-${col}-${row}`}><span class="title"></span></div>
        );
    }

    return(
        <div className={`node ${classes}`} id={`node-${col}-${row}`}><span class="title">{name}</span></div>
    );


}




export default Node;
