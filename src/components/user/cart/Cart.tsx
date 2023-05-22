import {IconButton, Badge} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../../interfaces';


export const Cart = () => {

    const navigate = useNavigate();
    const {cart} = useAppSelector(state => state.cart);

    const getQuantityCart = () => {
        const items = cart.reduce((prev, cartItem:CartItem) => prev + cartItem.quantity  ,0);
        return cart.length > 0 ? items : 0
    }

    return (
        <IconButton onClick={() => navigate("cart")}>
            <Badge badgeContent={getQuantityCart()}  sx={{color:"white"}}>
                <ShoppingCartIcon fontSize='large' htmlColor='white'/>
            </Badge>
        </IconButton>
    )
}
