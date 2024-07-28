// import { Button } from "@mui/material";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";
import { useEffect, useState } from "react";


//destruktuiranje: u {} navodimo propertije koje zelimo da koristimo iz objekta Props
export default function Catalog() {
    const [products, setProducts]=useState<Product[]>([]);
  //products pocetna lista, trenutno stanje, setProducts fja za azuriranje stanja

  useEffect(()=>{
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);

//   function addProduct() {
//     setProducts(prevState=>[...prevState, 
//       {
//         id:prevState.length+101,
//         name: 'product'+(prevState.length+1), 
//         price:(prevState.length*100)+100,
//         brand: "some brand",
//         description: "some desc",
//         pictureUrl: "http://picsum.photos/200"
//   }])
// }
  
    return (
        <>
            <ProductList products={products} />
            {/* <Button variant="contained" onClick={addProduct}>Add product</Button> */}
        </>
    )
}