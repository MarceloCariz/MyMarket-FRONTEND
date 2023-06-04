import {ChangeEvent} from 'react';
import {Box, CardActionArea, CardMedia, Divider, Grid, IconButton, Input, Link, Tooltip, Typography} from '@mui/material';
import {styled} from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { ContainerCenter } from '../../../styles/styles';
import { getPriceFormatted } from '../../../utils';
import { CartTitleOptions } from './CartTitleOptions';
import { addToCart, deleteProduct, removeToCart } from '../../../store/slices/cart/cartSlice';
import { CartItem } from '../../../interfaces';
import { CartItemList } from './CartItemList';

export const ListCart = () => {


    const {cart} = useAppSelector(state => state.cart);


    return (
        <Box  boxShadow={10} padding={4} borderRadius={3} >
            <OptionsTittle textAlign={"left"} variant='h5' display={{xs:"flex",sm:"none"}}>Productos</OptionsTittle>

            <CartTitleOptions />

            <Box maxHeight={"700px"} className="scrollBar" sx={{overflowY:"scroll", overflowX:"hidden"}} >

                {
                    cart.map( (product) => (
                        <CartItemList product={product} key={product._id}/>
                    ))
                }

            </Box>
        </Box>
    )
}


export const GridCenter = styled(Grid)`
    display: flex;
`;

export const OptionsTittle = styled(Typography)`
    width: 150px;
    text-align: center;
`;



//boxShadow={10} padding={4} borderRadius={6}