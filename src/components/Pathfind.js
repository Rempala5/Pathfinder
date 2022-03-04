import React, {useState, useEffect} from "react";
import Node from  "./Node"
import "./Pathfind.css"


const cols = 12;
const rows = 10;

let NODE_START_ROW = 9;
let NODE_START_COL = 10;
const NODE_END_ROW = 1;
const NODE_END_COL = 1;

const Pathfind = () =>{
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [Products, setProducts] = useState([]);
    let products = new Array();
    
    useEffect(() => {
        products = initiateProducts();
        initializeGrid();
        setProducts(products);
    },[]);

    const initializeGrid = () =>{
        const grid = new Array(rows);
        for(let i = 0; i < rows; i++){
            grid[i] = new Array(cols);
        }
        createSpot(grid);
        setGrid(grid);
        addNeighbors(grid);  

        console.log(products);

        for(let i=0; i<products.length; i++){
            let gridelement = grid[products[i].shelf_id.x][products[i].shelf_id.y];
            gridelement.isEnd = true;
            gridelement.title = products[i].name;
            console.log(gridelement);
        }

        //console.log(Products)
        //startNode = Grid[Node_Start_ROW][NODE_START_COL]
        //endNode = GRID[NODE_END_ROW][NODE_END_COL]
        // let path = depthfirstSearch(startNode, endNode)
        //setPath(Path)   
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
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="rowWrapper">
                        {row.map((col, colIndex) => {
                            const {isStart, isEnd, isWall, title} = col;
                            return(
                                <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWall={isWall} title={title}/>
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

    const list = Products.map(product => <li>{product.name}</li>);

    return(
        <div className="Wrapper">
        <button onClick={visualizePath}>Visualize Path</button>
            <h1>Pathfind component</h1>
            {gridwithNode}
            <div>
            {list}
            </div>
            
            
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
    this.title = null;
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



const Node_Start_ROW = 9;
const Node_Start_COL = 10;

Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}

function distance_from_start(col, row){
    return (Math.abs(Node_Start_COL - col) + Math.abs(Node_Start_ROW - row));
}

function Product(col,row, name){
    this.shelf_id = { "x": col, "y": row}
    //this.location = {"x": locCol, "y": locRow}
    this.name = name;
  }

  const initiateProducts= () =>{
    console.log("bottomw")
    let tempProducts = new Array();
    let cup = new Product(1, 1, 'cup');
    let bead = new Product(4,9,'bead');
    let toy = new Product(1,8, 'toy');

    tempProducts.push(cup);
    tempProducts.push(bead);
    tempProducts.push(toy);

    let length = tempProducts.length;
    let products = new Array();

    while(tempProducts.length > 0){
    let min = distance_from_start(tempProducts[0].x, tempProducts[0].y);
    let minIndex = 0;
    for(let i=0; i<tempProducts.length; i++){
        let newMin = distance_from_start((tempProducts[i].x, tempProducts[i].y))
        if(newMin < min){
        minIndex = i;
        }
    }
    tempProducts.swap(minIndex, tempProducts.length-1);
    products.push(tempProducts.pop()); 
      
    }
    
    return products;
    
}


export default Pathfind;