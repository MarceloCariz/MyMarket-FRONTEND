import { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getProductByShop } from '@/store';
import { AddButtonProduct, ModalProduct, ListProductItemShop } from '@/components';

export const ShopProductContainer = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;
    dispatch(getProductByShop());
  }, [dispatch, user]);

  return (
    <Box marginTop={5}>
      <ModalProduct />
      <Box>
        <AddButtonProduct />
      </Box>
      <Grid marginTop={2} container display={'flex'} spacing={2}>
        {products.length > 0 &&
          products.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={4} lg={3} xl={3}>
              <ListProductItemShop product={product} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
