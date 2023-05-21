import { Box, Grid } from "@mui/material"
import { useAppSelector } from "../../../hooks"
import { ListProductItem } from "./ListProductItem";
import { $CombinedState } from "@reduxjs/toolkit";



export const ProductsContainer = () => {

    const {products} = useAppSelector(state => state.product);


    return (
        <Box>
            <Grid container width={"100%"} display={'flex'} spacing={2} >
                {
                    products.length > 0 && products.map((product) => (
                        <Grid  key={product._id} item  xs={12} sm={6} md={4} lg={3}>
                            <ListProductItem  product={product}/>

                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}
