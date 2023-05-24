import {Box, CardActionArea, CardMedia, Divider, Grid, IconButton, Link, Typography} from '@mui/material';
import {styled} from 'styled-components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { ContainerCenter } from '../../../styles/styles';
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
            <OptionsTittle textAlign={"left"} variant='h5' display={{xs:"flex",sm:"none"}}>Productos</OptionsTittle>

            <CartTitleOptions />

            <Box maxHeight={"450px"} className="scrollBar" sx={{overflowY:"scroll", overflowX:"hidden"}} >

                {
                    cart.map( (product) => (
                        <Box key={product._id}>
                        <Grid  container spacing={2} sx={{mb: 1, mt:1}} > 

                            <Grid item xs={4} sm={2} md={2}> 
                                    <Link>
                                        <CardActionArea> 
                                            <CardMedia image={product.imgUrl} height={"120px"} sx={{objectFit:"contain"}} component="img"/>
                                        </CardActionArea>
                                    </Link>

                            </Grid>

                            <Grid item xs={4} sm={8} > 
                                <ContainerCenter gap={{xs:2,sm:2, md:10}} flexDirection={{xs:"column",sm:"row"}}>

                                    <OptionsTittle  variant='body1'>{product.title}</OptionsTittle>
                                    <OptionsTittle  variant='body1'>{getPriceFormatted(product.price)}</OptionsTittle>

                                    <ContainerCenter width={{xs: "150px", sm:"120px"}} >

                                        <IconButton onClick={() => HandleRemoveProduct(product)}>
                                            <RemoveCircleIcon color='error'/>
                                        </IconButton>
                                            <OptionsTittle  padding={1}  variant='body1'>{product.quantity}</OptionsTittle>
                                        <IconButton onClick={() => HandleAddProduct(product)}>
                                            <AddCircleIcon color="primary"/>
                                        </IconButton>
                                    </ContainerCenter>
                                
                                </ContainerCenter>

                            </Grid>
                            <GridCenter item sm={2}  > 
                            
                                <OptionsTittle variant='subtitle1' display={{xs:"flex", sm:"block"}} gap={2} alignItems={{xs:"center", md:"start"}}>
                                    <Typography display={{xs:"flex",sm:"none"}}>Total:</Typography>
                                    {getPriceFormatted(product.price * product.quantity)}
                                </OptionsTittle>

                            </GridCenter>


                        </Grid>
                        <Divider/>
                        </Box>
                        
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