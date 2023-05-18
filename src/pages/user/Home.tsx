import {useEffect} from 'react'
import {Box, Typography} from '@mui/material';
import { ProductsContainer } from '../../components';
import { useAppDispatch } from '../../hooks';
import { getProducts } from '../../store/slices/product/thunk';


const Home = () => {

    const dispatch =  useAppDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [])

    return (
        <Box >
            <Box width={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                <Typography marginBottom={5} variant='h5'>Productos cercanos</Typography>
                <ProductsContainer/>
            </Box>
        </Box>
    )
}

export default Home