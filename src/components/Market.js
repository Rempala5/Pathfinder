import { useEffect } from "react";
import {NODE_START_COL, NODE_START_ROW} from './Pathfind'

Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
  }
  
  function distance_from_start(col, row){
    return (Math.abs(NODE_START_COL - col) + Math.abs(NODE_START_ROW - row));
  
  }

  function Product(col,row, name){
    this.shelf_id = { "x": col, "y": row}
    this.name = name;
    this.startD = distance_from_start(col,row);
  }

  const initiateProducts = () =>{
    console.log("bottomw")
    let tempProducts = new Array();
    let cup = new Product(13, 14, 'cup');
    let bead = new Product(15,6,'bead');
    let toy = new Product(46, 14, 'toy');
    let cake = new Product(30, 44, 'cake');

    tempProducts.push(toy);
    tempProducts.push(cup);
    tempProducts.push(cake);
    tempProducts.push(bead);
    
    // tempProducts.push(bead);
    // tempProducts.push(toy);

    let length = tempProducts.length;
    let products = new Array();

    while(tempProducts.length > 0){
    let min = distance_from_start(tempProducts[0].shelf_id.x, tempProducts[0].shelf_id.y);
    let minIndex = 0;
    for(let i=0; i<tempProducts.length; i++){
        let newMin = distance_from_start(tempProducts[i].shelf_id.x, tempProducts[i].shelf_id.y);
        if(newMin < min){
        minIndex = i;
        }
    }
    tempProducts.swap(minIndex, 0);
    products.push(tempProducts.pop());  
    }
    return products;
}


function Market(props){

    useEffect(() =>{
        let products = initiateProducts();
        console.log("Market "+products);
        props.addProd(products);
    }, []);

    return(
        <h1>Welcome to marketPlace</h1>
    )
}

export default Market;
