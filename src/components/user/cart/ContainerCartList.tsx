
import {Box, Typography} from '@mui/material';
import { useAppSelector } from '../../../hooks';
import { ListCart, TotalCart } from '.';
import { ContainerCenter } from '../../../styles/styles';



export const ContainerCartList = () => {
    const {cart} = useAppSelector(state => state.cart);
    return (
        <Box>
            {
                cart.length === 0 ? (
                    <Typography>Aun no tienes productos en tu carrito</Typography>
                ):
                (   
                    <>
                        <Typography marginBottom={10}>Carrito de compras</Typography>
                        <ContainerCenter gap={2} flexDirection={{xs:"column", md:"row"}}>
                            <ListCart/>
                            <TotalCart/>
                        </ContainerCenter>
                    
                    </>
                    
                )
            }

        </Box>
    )
}
