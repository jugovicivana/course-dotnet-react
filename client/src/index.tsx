import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './app/layout/App.tsx'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
//import { StoreProvider } from './app/context/StoreContext.tsx';
//import { configureStore } from './app/store/configureStore.ts';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore.ts';
//import { fetchProductsAsync } from './features/catalog/catalogSlice.ts';


/*const store=configureStore();
console.log(store.getState());*/

//const store=configureStore();


//store.dispatch(fetchProductsAsync());


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    {/* dva zahtjeva se salju */}
    {/* <App /> */}
    {/* <StoreProvider>   //REACT CONTEXT */}
      <Provider store={store}>
        <RouterProvider router={router}/>

      </Provider>

    {/* </StoreProvider> */}
  </React.StrictMode>,
  
  
)
