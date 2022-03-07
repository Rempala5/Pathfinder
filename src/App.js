import logo from './logo.svg';
import './App.css';
import {Pathfind} from './components/Pathfind';
import { useEffect, useState } from 'react';
import Market from './components/Market';

function App() {
  let [Products, setProducts] = useState(new Array());

  const addProds = (args) =>{
    setProducts(args);
  }
     
  return (
    <div>
    <Market addProd = {addProds}/>
    <Pathfind products = {Products} />
    <h1>Hello World</h1>
    </div>
  );
}




export default App;
