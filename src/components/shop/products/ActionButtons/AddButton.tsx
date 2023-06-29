import { Button } from '@mui/material';
import { useAppDispatch } from '@/hooks';
import { toogleModalProductActions } from '@/store';

export const AddButtonProduct = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant='contained'
      onClick={() => dispatch(toogleModalProductActions({ type: 'add' }))}
    >
      Agregar nuevo producto
    </Button>
  );
};
