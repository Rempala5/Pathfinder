import logo from './logo.svg';
import './App.css';
import Pathfind from './components/Pathfind';
import { useEffect, useState } from 'react';

function App() {
  let [Products, setProducts] = useState(new Array());

  useEffect(()=>{
    console.log("top rednered")
    initializeProducts();
  }, []);

  function initializeProducts(){
    let products = new Array();
    let cup = new Product(1, 1, 'cup');
    let bead = new Product(9,4,'bead');
    let toy = new Product(1,8, 'toy');
    products.push(cup);
    products.push(bead);
    products.push(toy);

    setProducts(products)
  }

  return (
    <div>
    <Pathfind products = {Products}/>
    <h1>Hello World</h1>
    </div>
  
  
  );
}


function Product(col,row, name){
  this.shelf_id = { "x": col, "y": row}
  this.name = name;
}

export default App;
