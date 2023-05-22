import { Box, Grid } from '@mui/material'
import { OptionsTittle } from './ListCart'


export const CartTitleOptions = () => {
    return (
        <Grid container spacing={2} sx={{mb: 2}}  > 
            <Grid item xs={2}> 
                <OptionsTittle>Imagen</OptionsTittle>
            </Grid>
            <Grid item xs={7}> 
                <Box display={"flex"} gap={10}  flexDirection="row">
                    <OptionsTittle>Nombre</OptionsTittle>
                    <OptionsTittle>Precio</OptionsTittle>
                    <OptionsTittle>Cantidad</OptionsTittle>
                </Box>
            </Grid>
            <Grid item xs={2}> 
                <OptionsTittle variant='subtitle1'>Total</OptionsTittle>

            </Grid>
        </Grid>
    )
}
