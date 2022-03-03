import React, {useState, useEffect} from "react";
import Node from  "./Node"
import "./Pathfind.css"
import Astar from "../astarAlgorithm/astar.js"

const cols = 12;
const rows = 10;

let NODE_START_ROW = 9;
let NODE_START_COL = 10;
const NODE_END_ROW = 1;
const NODE_END_COL = 1;

const Pathfind = (props) =>{
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [Products, setProducts] = useState(props.products);

    
    useEffect(() => {
        console.log(props.products)
        initializeGrid();
    }, [Products]);

   
    const initializeGrid = () =>{
        const grid = new Array(rows);
        for(let i = 0; i < rows; i++){
            grid[i] = new Array(cols);
        }
        createSpot(grid);
        setGrid(grid);
        addNeighbors(grid);        
        let startNode = grid[NODE_START_ROW][NODE_START_COL];
        startNode.isend = false;
        let endNode = grid[NODE_END_ROW][NODE_END_COL];

        let path = Astar(startNode, endNode);

        startNode.isWall = false;
        endNode.isWall = false;
        setPath(path);
    };



    const createSpot = (grid) =>{
        for(let i=0; i< rows; i++){
            for(let j=0; j < cols; j++){
                grid[i][j] = new Spot(i, j)
            }
        }
    }

    const gridwithNode = (
        <div>
        {Products[0]}
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="rowWrapper">
                        {row.map((col, colIndex) => {
                            const {isStart, isEnd, isWall} = col;
                            return(
                                <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWall={isWall}/>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );


    const visualizePath = () => {
        for(let i=0; i<Path.length; i++){
            const node = Path[i];
            document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-shortest-path'
        }
        console.log("Visualizing")
    }

    
    return(
        <div className="Wrapper">
        <button onClick={visualizePath}>Visualize Path</button>
            <h1>Pathfind component</h1>
            {gridwithNode}
        </div>
        );  
};

const addNeighbors = (grid) => {
    for(let i=0; i< rows; i++){
        for (let j=0; j< cols; j++){
            grid[i][j].addneighbors(grid);
        }
    }
}

function getAisles(x, y){
    let isWall = false;
    if (y == 0 || y== cols-1 ){
        isWall = true;
    }
    if(x == 0 || x == rows -1){
        isWall = true;
    }
    if(x == 2 || x ==3 || x == 5 || x == 6){
        if( y >=2 && y<=4){
            isWall = true;
        }
        if(y >= 6 && y <=9 ){
            isWall = true;
        }
    }
    return isWall;
}

function Spot(i, j){
    this.y = i;
    this.x = j;
    this.isStart = this.y === NODE_START_ROW  && this.x === NODE_START_COL;
    this.isEnd = false;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbors = [];
    this.isWall = getAisles(i, j);
    this.previous = undefined;
    this.addneighbors = function(grid){
        let i = this.y;
        let j = this.x;
        if(i > 0) this.neighbors.push(grid[i-1][j])
        if(i < rows - 1) this.neighbors.push(grid[i+1][j])
        if(j > 0) this.neighbors.push(grid[i][j-1]);
        if(j < cols - 1) this.neighbors.push(grid[i][j+1]);
    };
}

export default Pathfind;