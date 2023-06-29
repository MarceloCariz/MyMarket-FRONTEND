import { Box, Grid, Typography } from '@mui/material';
import { styled } from 'styled-components';
import { useAppSelector } from '@/hooks';
import { CartItemList, CartTitleOptions } from '@/components';

export const ListCart = () => {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <Box boxShadow={10} padding={4} borderRadius={3}>
      <OptionsTittle textAlign={'left'} variant='h5' display={{ xs: 'flex', sm: 'none' }}>
        Productos
      </OptionsTittle>

      <CartTitleOptions />

      <Box
        maxHeight={'700px'}
        className='scrollBar'
        sx={{ overflowY: 'scroll', overflowX: 'hidden' }}
      >
        {cart.map((product) => (
          <CartItemList product={product} key={product._id} />
        ))}
      </Box>
    </Box>
  );
};

export const GridCenter = styled(Grid)`
  display: flex;
`;

export const OptionsTittle = styled(Typography)`
  width: 150px;
  text-align: center;
`;
