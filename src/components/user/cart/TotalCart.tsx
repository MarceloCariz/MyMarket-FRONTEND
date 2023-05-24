import {Box, Button, Typography} from '@mui/material'
import { useAppSelector } from '../../../hooks'
import { getPriceFormatted } from '../../../utils';
import { CenterColumn } from '../../../styles/styles';

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
        <CenterColumn height={"20%"} width={{xs:"auto", md:"350px"}} boxShadow={10} padding={4} borderRadius={6} >

            <Box>
                <Typography variant='subtitle1'>Items: {getTotalItems()} </Typography>  
                <Typography variant='h4'>Total: {getTotalCart()}</Typography>
            </Box>

            <CenterColumn marginTop={2}>
                <Button variant='contained' color='success'>Realizar pedido</Button>
            </CenterColumn>
        </CenterColumn>
    )
}
