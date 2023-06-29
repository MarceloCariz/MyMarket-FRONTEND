import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ProductsContainer } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { searchProduct } from '@/store';

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q');

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    console.log(q);
    if (!q) return;
    dispatch(searchProduct(q));
  }, [dispatch, q]);

  return (
    <Box>
      {products.length === 0 ? (
        <Typography variant='h5'>
          No hay resultados para:
          <Typography component={'span'} color={'gray'} variant='h5'>
            {' '}
            {`"${q}"`}
          </Typography>
        </Typography>
      ) : (
        <>
          <Typography marginBottom={5} variant='h5'>
            Resultado de la busqueda: {q}{' '}
          </Typography>
          <ProductsContainer />
        </>
      )}
    </Box>
  );
};

export default Search;
