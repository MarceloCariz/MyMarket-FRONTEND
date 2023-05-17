import {Button} from '@mui/material'
import { useAppDispatch } from '../../../../hooks'
import { toogleModalProductActions } from '../../../../store/slices/product/productSlice';


export const UpdateButton = () => {

    const dispatch = useAppDispatch();

    return (
        
        <Button variant="contained" color="success" onClick={() => dispatch(toogleModalProductActions({type:'edit'}))}>
            Actualizar
        </Button>
    )
}
