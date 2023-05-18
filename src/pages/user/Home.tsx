import {useEffect} from 'react'
import {Box, CircularProgress, Typography} from '@mui/material';
import { ProductsContainer } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProducts } from '../../store/slices/product/thunk';


const Home = () => {

    const dispatch =  useAppDispatch();
    const {loadingProducts} = useAppSelector(state => state.product);

    useEffect(() => {
        dispatch(getProducts());
    }, [])

    return (
        <Box >
            <Box width={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                <Typography marginBottom={5} variant='h5'>Productos cercanos</Typography>
                {
                    loadingProducts ? (
                        <Box display={"flex"} justifyContent={"center"}>
                            <CircularProgress />
                        </Box>
                    ) : 
                    (
                        <ProductsContainer/>

                    )
                }
            </Box>
        </Box>
    )
}

export default Home