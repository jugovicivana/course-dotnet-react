// import { Button } from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";
import { useEffect } from "react";


//destruktuiranje: u {} navodimo propertije koje zelimo da koristimo iz objekta Props
export default function Catalog() {

  //lokalno stanje X
  //const [products, setProducts]=useState<Product[]>([]);
  //products pocetna lista, trenutno stanje, setProducts fja za azuriranje stanja
  const products=useAppSelector(productSelectors.selectAll);
  const dispatch=useAppDispatch(); //da bismo mogli koristiti create async thunk

  const {productsLoaded, status}=useAppSelector(state=>state.catalog);

  //const [loading, setLoading]=useState(true);


  /*useEffect(()=>{
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);*/

  //setujemo produkte u lokalnom stanju
  /*
  useEffect(()=>{
    agent.Catalog.list()
      .then(products=> setProducts(products))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
  }, []);
  */
  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded, dispatch])

  if(status.includes('pending')) return <LoadingComponent message="Loading products"/>

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