import {  Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { ActionModalCategoryEnum } from '../../../enums';
import { toogleModalCategory } from '../../../store/slices/admin/adminSlice';
import { useAppDispatch } from '../../../hooks';



export const EditCategoryButton = () => {

    const dispatch = useAppDispatch();

    const handleOpenModal = () => {
        dispatch(toogleModalCategory(ActionModalCategoryEnum.EDIT))
    }

    return (
        <Button variant='contained' color='success' onClick={handleOpenModal} startIcon={<EditIcon/>}>
            Editar
        </Button>
    )
}
