import {Button} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch } from '../../../hooks';
import { addToCart } from '../../../store/slices/cart/cartSlice';
import { ProductI } from '../../../interfaces';

interface Props {
    product: ProductI
}


export const AddToCartButton = ({product}:Props) => {

    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({product}))
    }

    return (
        <Button variant="contained" color="success" onClick={handleAddToCart} startIcon={<ShoppingCartIcon/>}>
            Agregar al carrito
        </Button>
    )
}
