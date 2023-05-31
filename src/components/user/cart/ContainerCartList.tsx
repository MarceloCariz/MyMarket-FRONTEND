import {Box, Typography, Button} from '@mui/material';
import { useAppSelector } from '../../../hooks';
import { ListCart, TotalCart } from '.';
import { CenterColumn, ContainerCenter } from '../../../styles/styles';
import { useNavigate } from 'react-router-dom';



export const ContainerCartList = () => {

    const {cart} = useAppSelector(state => state.cart);

    const navigate = useNavigate();

    return (
        <Box>
            {
                cart.length === 0 ? (
                    <CenterColumn>
                        <Typography textAlign={"center"}>Aún no tienes productos en tu carrito</Typography>
                        <Button onClick={() => navigate("/home")} variant='contained'>Volver al inicio</Button>
                    </CenterColumn>
                ):
                (   
                    <>
                        <Typography marginBottom={2} textAlign={{xs:"center",md:"start"}} variant='h4'>Carrito de compras</Typography>
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
