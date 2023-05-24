import { Box, Grid, Typography } from '@mui/material'
import { OptionsTittle } from './ListCart'
import { styled } from 'styled-components'


export const CartTitleOptions = () => {
    return (
        <Grid container  sx={{mb: 2}} display={{xs:"none",sm:"flex"}}   > 
            <Grid item  sm={3} md={2}> 
                <OptionTitle >Imagen</OptionTitle>
            </Grid>
            <Grid item  sm={6} md={8}> 
                <Box display={"flex"} gap={10}  flexDirection="row">
                    <OptionsTittle>Nombre</OptionsTittle>
                    <OptionsTittle>Precio</OptionsTittle>
                    <OptionsTittle>Cantidad</OptionsTittle>

                </Box>
            </Grid>
            <Grid item sm={3} md={2} > 
                <OptionsTittle marginLeft={{sm:2, md:0}} width={"auto"} variant='subtitle1'>Total</OptionsTittle>
            </Grid>

        </Grid>
    )
}


const OptionTitle = styled(Typography)`
    width: 'auto'
`;