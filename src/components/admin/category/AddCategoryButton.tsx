import {  Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../../../hooks';
import { toogleModalCategory } from '../../../store/slices/admin/adminSlice';
import { ActionModalCategoryEnum } from '../../../enums';



export const AddCategoryButton = () => {
    const dispatch = useAppDispatch();

    const handleOpenModal = () => {
        dispatch(toogleModalCategory(ActionModalCategoryEnum.ADD))
    }

    return (
        <Button 
            onClick={handleOpenModal}
            color='primary' variant='contained' startIcon={<AddIcon/>}>
            Agregar nueva categoría
        </Button>
    )
}
