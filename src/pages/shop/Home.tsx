import {Box, Typography} from '@mui/material'
import { ShopProductContainer } from '../../components/shop/products/ShopProductContainer'

const Home = () => {


    
    return (
        <Box>
            <Typography variant='h4'>Mis productos</Typography>
            <ShopProductContainer/>
        </Box>
    )
}

export default Home