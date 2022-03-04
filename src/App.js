import logo from './logo.svg';
import './App.css';
import Pathfind from './components/Pathfind';
import { useEffect, useState } from 'react';


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

function App() {
  let [Products, setProducts] = useState(new Array());
  
  useEffect(()=>{
    console.log("top rednered")
  }, []);

     
  return (
    <div>
    <Pathfind/>
    <h1>Hello World</h1>
    </div>
  
  
  );
}


function Product(col,row, name){
  this.shelf_id = { "x": col, "y": row}
  this.name = name;
}

export default App;
