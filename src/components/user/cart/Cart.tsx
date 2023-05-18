import {IconButton, Badge} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../../../hooks';


export const Cart = () => {

    const {cart} = useAppSelector(state => state.cart);

    const getQuantityCart = () => {
        return cart.length > 0 ? cart.length : 0
    }

    return (
        <IconButton>
            <Badge badgeContent={getQuantityCart()}  sx={{color:"white"}}>
                <ShoppingCartIcon fontSize='large' htmlColor='white'/>
            </Badge>
        </IconButton>
    )
}
