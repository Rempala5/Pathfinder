import { useEffect, useState } from "react";
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

  function Product(col,row, name, plat_col, plat_row){
    this.shelf_id = { "x": col, "y": row}
    this.id = `${row}-${col}`
    this.plat_id = {"x":plat_col, "y": plat_row};
    this.name = name;
    this.startD = distance_from_start(col,row);
    this.isPicked = true;
    this.live = false;
    this.path = [];
  }

  const initiateProducts = () =>{
    let tempProducts = new Array();
    let cup = new Product(13, 14, 'cup', 14, 14);
    let bead = new Product(15,6,'bead', 14, 16);
    let toy = new Product(46, 14, 'toy', 45, 14);
    let cake = new Product(30, 44, 'cake', 30, 43);
    let candy = new Product(12, 20, 'candy', 12, 21);
    let chocolate = new Product(12, 18, 'chocolate', 12, 19);

    tempProducts.push(toy);
    tempProducts.push(cup);
    tempProducts.push(cake);
    tempProducts.push(bead);
    tempProducts.push(candy);
    tempProducts.push(chocolate);
    
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
  const [lists, setLists] = useState([])
  let list = []

    useEffect(() =>{
        let products = initiateProducts();
        props.addProd(products);
        setLists(products)
    }, []);

    return(
      <div>
      <h1></h1>
      </div>
    )
}

export default Market;
