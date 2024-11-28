import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Order } from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/models/basket";

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({ order, setSelectedOrder }: Props) {
  const subtotal = order.orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ) ?? 0;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} gutterBottom variant="h4">
          Order # {order.id} - {order.orderStatus}{" "}
        </Typography>
        <Button
          onClick={() => setSelectedOrder(0)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
          color="primary"
        >
          Back to orders
        </Button>
      </Box>
      <BasketTable items={order.orderItems as BasketItem[]} isBasket={false}/>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal}/>
        </Grid>
      </Grid>
      <Grid container>
      <TableContainer component={Paper} sx={{mt: 2}}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={7}>
                Details for shipping address
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell align="right">Address1</TableCell>
              <TableCell align="right">Address2</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Zip</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow key={order.id}>
                <TableCell>{order.shippingAddress.fullName}</TableCell>
                <TableCell align="right">{order.shippingAddress.address1}</TableCell>
                <TableCell align="right">{order.shippingAddress.address2}</TableCell>
                <TableCell align="right">{order.shippingAddress.city}</TableCell>
                <TableCell align="right">{order.shippingAddress.zip}</TableCell>
                <TableCell align="right">{order.shippingAddress.state}</TableCell>
                <TableCell align="right">{order.shippingAddress.country}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </>
  );
}
