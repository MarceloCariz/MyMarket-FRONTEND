import {useState, useMemo} from 'react'
import { Button,  Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useAppSelector } from '../../../hooks';
import { ActionModalCategoryEnum } from '../../../enums';

interface Props {
    handleSubmit:(e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

export const ConfirmButton = ({handleSubmit}:Props) => {
    const [open, setOpen] = useState(false);

    const {activeCategory, isOpenModalCategory} = useAppSelector(state => state.admin);

    const categoryName= useMemo(() => activeCategory?.categoryName && activeCategory.categoryName, [])
    const handleConfirm = () => {
        if(isOpenModalCategory.type === ActionModalCategoryEnum.ADD){
            handleSubmit();
            return;
        }
        setOpen(true)
    }

    return (
        <>
        <Dialog open={open}  onClose={() => setOpen(false)}>
            <DialogTitle>
                {`Confirmar actualización de la categoría: ${categoryName}` }
            </DialogTitle>
            <DialogActions>
                <Button color='error' onClick={() => setOpen(false)}>
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
        <Button  onClick={handleConfirm}  
            variant='contained' color={isOpenModalCategory.type === ActionModalCategoryEnum.ADD ? 'primary' : 'success'}>

            {isOpenModalCategory.type === ActionModalCategoryEnum.ADD  ? "Agregar categoría" :  "Editar categoría"}
            </Button>
        </>
        
    )
}
