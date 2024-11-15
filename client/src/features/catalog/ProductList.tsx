import { Grid } from "@mui/material"
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
    products: Product[];
}

export default function ProductList({products}:Props) {
    const {productsLoaded}=useAppSelector(state=>state.catalog)
    return (
        // <List>
        //     {products.map(product => (
        //         <ProductCard key={product.id} product={product}/>
        //     ))}
        // </List>
        //4 => 4*8 pixels=32 pixels
        <Grid container spacing={4}>
            {products.map(product => (
                //4 je 1/3 od 12 (12 kolona u gridu ukupno) pa ce svaki 
                //product card zauzimati 1/3 ekrana sirinom, tj bice 3 kartice u jednom redu
                <Grid item xs={4} key={product.id}>
                    {!productsLoaded ? (
                        <ProductCardSkeleton />
                    ): (
                        <ProductCard product={product}/>
                    )}
                </Grid>
            ))}
        </Grid>
    )
}