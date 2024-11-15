// import { Button } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import { useEffect } from "react";
import ProductSerach from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";

const sortOptions=[
  {value: 'name', label:'Alphabetical'},
  {value: 'priceDesc', label:'Price - High to low'},
  {value: 'price', label:'Price - Low to high'},
]

// ----------------- 118. LEKCIJA 6:43 -------------------------

//destruktuiranje: u {} navodimo propertije koje zelimo da koristimo iz objekta Props
export default function Catalog() {

  //lokalno stanje X
  //const [products, setProducts]=useState<Product[]>([]);
  //products pocetna lista, trenutno stanje, setProducts fja za azuriranje stanja
  const products=useAppSelector(productSelectors.selectAll);
  const dispatch=useAppDispatch(); //da bismo mogli koristiti create async thunk

  const {productsLoaded, filtersLoaded, brands, types, productParams, metaData}=useAppSelector(state=>state.catalog);

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
    if(!productsLoaded) dispatch(fetchProductsAsync());
    
  }, [productsLoaded, dispatch])

  useEffect(()=>{
    if(!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded])

  if(!filtersLoaded) return <LoadingComponent message="Loading products"/>

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
        <Grid container columnSpacing={4}>
          <Grid item xs={3}>
            <Paper sx={{mb:2}}>
             <ProductSerach/>
            </Paper>
            <Paper sx={{mb: 2, p:2}}>
              <RadioButtonGroup 
                selectedValue={productParams.orderBy}
                options={sortOptions}
                onChange={(e)=>dispatch(setProductParams({orderBy: e.target.value}))}
              />
            </Paper>
            <Paper sx={{p:2, mb:2}}>
              <CheckboxButtons
                items={brands}
                checked={productParams.brands}
                onChange={(items: string[])=>dispatch(setProductParams({brands: items}))}
              />
            </Paper>
            <Paper sx={{p:2, mb:2}}>
              <CheckboxButtons
                items={types}
                checked={productParams.types}
                onChange={(items: string[])=>dispatch(setProductParams({types: items}))}
              />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <ProductList products={products} />
            {/* <Button variant="contained" onClick={addProduct}>Add product</Button> */}
          </Grid>
          <Grid item xs={3}/>
          <Grid item xs={9} sx={{mb:2, mt:2}}>
            {metaData &&
            <AppPagination 
             metaData={metaData}
             onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber: page}))}
            />}
          </Grid>
        </Grid>
    )
}