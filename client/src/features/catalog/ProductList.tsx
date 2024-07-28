import { Grid } from "@mui/material"
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({products}:Props) {
    return (
        // <List>
        //     {products.map(product => (
        //         <ProductCard key={product.id} product={product}/>
        //     ))}
        // </List>
        //4 => 4*8 pixels=32 pixels
        <Grid container spacing={4}>
            {products.map(product => (
                //3 je 1/4 od 12 (12 kolona u gridu ukupno) pa ce svaki 
                //product card zauzimati 1/4 ekrana sirinom, tj bice 4 kartice u jednom redu
                <Grid item xs={3} key={product.id}>
                    <ProductCard product={product}/>     
                </Grid>
            ))}
        </Grid>
    )
}