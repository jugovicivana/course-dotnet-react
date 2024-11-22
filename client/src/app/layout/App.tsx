// import Catalog from "../../features/catalog/Catalog.tsx";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header.tsx";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingComponent from "./LoadingComponent.tsx";
import { useAppDispatch } from "../store/configureStore.ts";
import { fetchBasketAsync } from "../../features/basket/basketSlice.ts";
import { fetchCurrentUser } from "../../features/account/accountSlice.ts";


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

  const initApp=useCallback(async ()=>{
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(()=>{
    initApp().then(()=>setLoading(false));

    /*
    const buyerId=getCookie('buyerId');
    dispatch(fetchCurrentUser());
    if(buyerId){
      agent.Basket.get()
      //.then(basket=>setBasket(basket))  REACT CONTEXT
      .then(basket=>dispatch(setBasket(basket)))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
    }
    else{
      setLoading(false);
    }*/

  }, [initApp])
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
      {/* <ToastContainer position="bottom-right" hideProgressBar theme="colored"/> */}
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
