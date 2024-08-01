// import Catalog from "../../features/catalog/Catalog.tsx";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header.tsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";


function App() {
  // stanja inicijalizovana pomocu liste produkta
  // const [products, setProducts]=useState([
  //   {name: 'product1', price: 100.00},
  //   {name: 'product2', price: 200.00},
  // ]);
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
  return (
    <ThemeProvider theme={theme}>
      {/* <h1 style={{color:'blue'}}>Re-Store</h1> */}
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
