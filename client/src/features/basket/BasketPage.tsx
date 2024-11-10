import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage(){
  /*
    const [loading, setLoading]=useState(true);
    const [basket, setBasket]=useState<Basket|null>(null);

    useEffect(()=>{
        agent.Basket.get()
        .then(basket=>setBasket(basket))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false))
    }, [])

    if(loading) return <LoadingComponent message="Loading basket..."/>

    */

    //const {basket, setBasket, removeItem}=useStoreContext();  REACT CONTEXT
    const {basket, status}=useAppSelector(state=>state.basket);
    const dispatch=useAppDispatch();
    //const [loading, setLoading]=useState(false);

    /*
    const [status, setStatus]=useState({
      loading: false,
      name: ''
    });
    */

    /*
    function handleAddItem(productId: number, name: string){
      setStatus({loading: true, name});
      agent.Basket.addItem(productId)
      .then(basket=>dispatch(setBasket(basket)))
      .catch(error=>console.log(error))
      .finally(()=>setStatus({loading: false, name: ''}))
    }

    function handleRemoveItem(productId: number, quantity=1, name: string){
      setStatus({loading: true, name});
      agent.Basket.removeItem(productId, quantity)
      .then(()=>dispatch(removeItem({productId, quantity})))
      .catch(error=>console.log(error))
      .finally(()=>setStatus({loading: false, name: ''}))
    }
    */


    if(!basket) return <Typography variant="h3">Your basket is empty</Typography>
    return(
      <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map(item => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                  <img src={item.picture} alt={item.name} style={{height: 50, marginRight: 20}}/>
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
              <TableCell align="center">
                {/* <LoadingButton  loading={status.loading && status.name==='rem'+item.productId} color="error" onClick={()=>handleRemoveItem(item.productId, 1, 'rem'+item.productId)}> */}
                <LoadingButton loading={status==='pendingRemoveItem'+item.productId+'rem'} 
                  color="error" 
                  onClick={()=>dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, name: 'rem'}))}>
                  <Remove/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton 
                  color="primary"  
                  loading={status==='pendingAddItem'+item.productId} 
                  onClick={()=>dispatch(addBasketItemAsync({productId:item.productId}))}>
                  <Add/>
                </LoadingButton>
                </TableCell>
              <TableCell align="right">{(item.price*item.quantity/100).toFixed(2)}</TableCell>
              <TableCell>
                <LoadingButton 
                  loading={status==='pendingRemoveItem'+item.productId+'del'} 
                  color="error" 
                  onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId, quantity: item.quantity, name: 'del'}))}>
                    <Delete/>
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
      <Grid item xs={6} />
      <Grid item xs={6} >
        <BasketSummary />
        <Button 
          component={Link}
          to='/checkout'
          variant='contained'
          size='large'
          fullWidth
        >
          Checkout
        </Button>
      </Grid>

    </Grid>
    </>
    
    
    )
}