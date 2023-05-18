import {useState} from 'react'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { toogleModalProductActions } from '../../../../store/slices/product/productSlice';

interface Props {
    handleSubmit:(e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

export const ConfirmButton = ({handleSubmit}:Props) => {
    const [open, setOpen] = useState(false);

    const {loadingAction, isOpenModalProductActions, activeProduct} = useAppSelector(state => state.product);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useAppDispatch();




    return (
        <>
            <Dialog open={open}  onClose={() => setOpen(false)}>
                <DialogTitle>
                    {`Confirmar actualización del producto: ${activeProduct?.title}` }
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        handleSubmit()
                        setOpen(false)
                    }} >
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <Button  onClick={()=> {
                            if(isOpenModalProductActions.type === "add"){
                                handleSubmit();
                                return;
                            }
                            setOpen(true)

                        }}  
                variant='contained' color={isOpenModalProductActions.type === "add" ? 'primary' : 'success'}>
            {
                loadingAction && (
                    <CircularProgress  sx={{color: "white", marginRight: '20px'}}/>
                )
            }
            {isOpenModalProductActions.type === "add"  ? (!loadingAction && "Agregar producto") : (!loadingAction && "Editar producto")}
        </Button>
        
        </>

    )
}
