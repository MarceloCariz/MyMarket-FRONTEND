import {useEffect} from 'react'
import {Button} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addToCart } from '../../../store/slices/cart/cartSlice';
import { ProductI } from '../../../interfaces';

interface Props {
    product: ProductI
}


export const AddToCartButton = ({product}:Props) => {

    const dispatch = useAppDispatch();
    const {cart} = useAppSelector(state => state.cart);

    const handleAddToCart = () => {
        dispatch(addToCart({product: {...product, quantity: +1}}))
    }

 

    return (
        <Button variant="contained" color="success" onClick={handleAddToCart} startIcon={<ShoppingCartIcon/>}>
            Agregar al carrito
        </Button>
    )
}
