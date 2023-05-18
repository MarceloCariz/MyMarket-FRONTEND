import {useEffect} from 'react'
import { useParams } from "react-router-dom"
import {Box, Typography} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductByShopUSer } from '../../store/slices/product/thunk';
import { ProductsContainer } from '../../components';



const ShopPage = () => {

    const dispatch = useAppDispatch();
    const {shopId} = useParams();
    const {products} = useAppSelector(state => state.product);


    useEffect(() => {
        if(!shopId) return;
        dispatch(getProductByShopUSer(shopId));
    }, [shopId])

    return (
        <Box>
            {

                <>

                        {
                            products.length === 0 ?
                            (
                                <Typography>Esta tienda no tiene productos</Typography>
                            ):
                            (
                                <>
                                    <Typography marginBottom={7} fontSize={32}>Productos de la tienda: 
                                    {products[0].shopName ? products[0].shopName : ""}</Typography>
                                    <ProductsContainer/>
                                </>
                            )
                        }
                </>
            }

        </Box>
    )
}

export default ShopPage