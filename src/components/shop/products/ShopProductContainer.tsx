import {useEffect} from 'react'
import { Box, Grid } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { ListProductItem } from "./ListProductItem";
import { getProductByShop } from '../../../store/slices/product/thunk';





export const ShopProductContainer = () => {

    const dispatch = useAppDispatch();
    const {products} = useAppSelector(state => state.product);
    const {user} = useAppSelector(state => state.auth);



    useEffect(() => {
        if(!user) return;
        dispatch(getProductByShop())
        console.log(products)
    }, [user])



    return (
        <Box marginTop={5}>
            <Grid container width={"100%"} display={'flex'} spacing={2} >
                {
                    products.length > 0 && products.map((product) => (
                        <Grid  key={product._id} item  xs={12} md={4} lg={3}>
                            <ListProductItem  product={product}/>

                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}
