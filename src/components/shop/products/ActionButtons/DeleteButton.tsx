import {useState} from 'react'
import {Button, Dialog, DialogActions, DialogTitle} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteProduct } from '../../../../store/slices/product/thunk';

export const DeleteButton = () => {
    const [open, setOpen] = useState(false)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const {activeProduct} = useAppSelector(state => state.product);

    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteProduct());
    }

    return (
        <>
            <Dialog open={open} fullScreen={fullScreen} onClose={() => setOpen(false)}>
                <DialogTitle>
                    {`Confirmar eliminacion del producto: ${activeProduct?.title}` }
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant="contained" color="error" onClick={() => setOpen(true)}>
                Eliminar
            </Button>
        </>

    )
}
