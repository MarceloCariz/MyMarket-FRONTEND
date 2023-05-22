import {Box, Typography} from '@mui/material'
import { useAppSelector } from '../../../hooks'
import { getPriceFormatted } from '../../../utils';

export const TotalCart = () => {

    const {cart} = useAppSelector(state => state.cart);

    const getTotalCart = () => {
        const total = cart.reduce((prev, cartItem) => prev + (cartItem.price * cartItem.quantity), 0);
        return getPriceFormatted(total);
    }

    const getTotalItems = () => {
        const items = cart.reduce((prev, cartItem) => prev +  cartItem.quantity, 0);
        return items;
    }

    return (
        <Box  boxShadow={10} padding={4} borderRadius={6} >
            <Typography variant='subtitle1'>Items: {getTotalItems()} </Typography>
            <Typography variant='h4'>Total: {getTotalCart()}</Typography>

        </Box>
    )
}
