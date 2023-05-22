import {Box, Button, CardActionArea, CardMedia, Grid, Link, Typography,Divider} from '@mui/material';
import {styled} from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { CenterColumn, ContainerCenter } from '../../../styles/styles';
import { getPriceFormatted } from '../../../utils';
import { CartTitleOptions } from './CartTitleOptions';
import { addToCart, removeToCart } from '../../../store/slices/cart/cartSlice';
import { CartItem } from '../../../interfaces';

export const ListCart = () => {


    const {cart} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    
    const HandleAddProduct = (product: CartItem) => {
        dispatch(addToCart({product}))
    }

    const HandleRemoveProduct = (product: CartItem) => {
        dispatch(removeToCart({product}))
    }

    return (
        <Box  boxShadow={10} padding={4} borderRadius={6} >
            <CartTitleOptions />

            <Box maxHeight={"450px"} sx={{}} overflow={"scroll"}>
                {
                    cart.map( (product) => (
                        <Grid  container spacing={2} sx={{mb: 1}} key={product._id}> 

                            <Grid item xs={2}> 
                                    <Link>
                                        <CardActionArea> 
                                            <CardMedia image={product.imgUrl} height={"120px"} sx={{objectFit:"contain"}} component="img"/>
                                        </CardActionArea>
                                    </Link>
                            </Grid>
                            <Grid item xs={7}> 
                                <ContainerCenter gap={12}>

                                    <OptionsTittle  variant='body1'>{product.title}</OptionsTittle>
                                    <OptionsTittle  variant='body1'>{getPriceFormatted(product.price)}</OptionsTittle>

                                    <ContainerCenter width={"110px"} >

                                        <Button onClick={() => HandleRemoveProduct(product)}>
                                            - 1
                                        </Button>
                                            <OptionsTittle border={1} padding={1}  variant='body1'>{product.quantity}</OptionsTittle>
                                        <Button onClick={() => HandleAddProduct(product)}>
                                            + 1
                                        </Button>
                                    </ContainerCenter>
                                
                                </ContainerCenter>
                            </Grid>
                            <GridCenter item xs={2} > 
                            
                                <OptionsTittle variant='subtitle1'>{getPriceFormatted(product.price * product.quantity)}</OptionsTittle>

                            </GridCenter>
                            
                        </Grid>
                        
                    ))
                }
            </Box>
        </Box>
    )
}


export const GridCenter = styled(Grid)`
    display: flex;
    flex-direction: column;
    justify-content:center;
`;

export const OptionsTittle = styled(Typography)`
    width: 150px;
    text-align: center;
`;


//boxShadow={10} padding={4} borderRadius={6}