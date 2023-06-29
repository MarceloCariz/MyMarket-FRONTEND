import { useState } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useAppSelector } from '@/hooks';

interface Props {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

export const ConfirmButtonProduct = ({ handleSubmit }: Props) => {
  const [open, setOpen] = useState(false);

  const { loadingAction, isOpenModalProductActions, activeProduct } = useAppSelector(
    (state) => state.product,
  );

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{`Confirmar actualización del producto: ${activeProduct?.title}`}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              handleSubmit();
              setOpen(false);
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={() => {
          if (isOpenModalProductActions.type === 'add') {
            handleSubmit();
            return;
          }
          setOpen(true);
        }}
        variant='contained'
        color={isOpenModalProductActions.type === 'add' ? 'primary' : 'success'}
      >
        {loadingAction && <CircularProgress sx={{ color: 'white', marginRight: '20px' }} />}
        {isOpenModalProductActions.type === 'add'
          ? !loadingAction && 'Agregar producto'
          : !loadingAction && 'Editar producto'}
      </Button>
    </>
  );
};
