import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { deleteCategory } from '@/store';

export const DeleteCategoryButton = () => {
  const [open, setOpen] = useState(false);

  const { activeCategory } = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteCategory());
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {`Confirmar eliminación de la categoría: ${activeCategory?.categoryName}`}
        </DialogTitle>
        <DialogActions>
          <Button color='error' onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleDelete}>Confirmar</Button>
        </DialogActions>
      </Dialog>
      <Button variant='contained' color='error' onClick={() => setOpen(true)}>
        Eliminar
      </Button>
    </>
  );
};
