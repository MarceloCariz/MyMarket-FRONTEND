import {useEffect} from 'react'
import { Box, Grid } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { ListProductItem } from "./ListProductItem";
import { getProductByShop } from '../../../store/slices/product/thunk';
import { AddButton } from './ActionButtons';
import { ModalProduct } from './modal/ModalProduct';





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
            <ModalProduct/>
            <Box>
                <AddButton/>
            </Box>
            <Grid marginTop={2} container  display={'flex'} spacing={2} >
                {
                    products.length > 0 && products.map((product) => (
                        <Grid  key={product._id} item  xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ListProductItem  product={product}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}
