// import Catalog from "../../features/catalog/Catalog.tsx";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header.tsx";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext.tsx";
import agent from "../api/agent.ts";
import LoadingComponent from "./LoadingComponent.tsx";
import { getCookie } from "../util/util.ts";
import { useAppDispatch } from "../store/configureStore.ts";
import { setBasket } from "../../features/basket/basketSlice.ts";


function App() {
  // stanja inicijalizovana pomocu liste produkta
  // const [products, setProducts]=useState([
  //   {name: 'product1', price: 100.00},
  //   {name: 'product2', price: 200.00},
  // ]);
  
  
  //REACT CONTEXT
  //const {setBasket}=useStoreContext();


  //REDUX CONTEXT 
  const dispatch=useAppDispatch();


  const [loading, setLoading]=useState(true);

  useEffect(()=>{
    const buyerId=getCookie('buyerId');
    if(buyerId){
      agent.Basket.get()
      //.then(basket=>setBasket(basket))  REACT CONTEXT
      .then(basket=>dispatch(setBasket(basket)))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
    }
    else{
      setLoading(false);
    }
  }, [dispatch])
  const [darkMode, setDarkMode]=useState(false);
  const paletteType=darkMode ? 'dark':'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType==='light'? '#eaeaea' :'#121212'
      },
    }
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message="Initialising app..."/>
  return (
    <ThemeProvider theme={theme}>
      {/* <h1 style={{color:'blue'}}>Re-Store</h1> */}
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
