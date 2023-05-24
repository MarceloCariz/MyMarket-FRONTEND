import { Box, Grid, Typography } from '@mui/material'
import { GridCenter, OptionsTittle } from './ListCart'
import { styled } from 'styled-components'


export const CartTitleOptions = () => {
    return (
        <Grid container spacing={2}  sx={{mb: 2}} display={{xs:"none",sm:"flex"}}   > 
            <Grid item   sm={2}> 
                <OptionsTittle textAlign={"center"} width={"120px"} >Imagen</OptionsTittle>
            </Grid>
            <GridCenter item  sm={8}> 
                <Box display={"flex"} gap={{sm:0, md:6}}  flexDirection="row">
                    <OptionsTittle >Nombre</OptionsTittle>
                    <OptionsTittle>Precio</OptionsTittle>
                    <OptionsTittle width={{sm:"100px",md:"120px"}}>Cantidad</OptionsTittle>

                </Box>
            </GridCenter>
            <Grid item sm={2} > 
                <OptionsTittle marginRight={5} width={"auto"} variant='subtitle1'>Total</OptionsTittle>
            </Grid>

        </Grid>
    )
}


