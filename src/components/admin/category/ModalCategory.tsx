import {useMemo} from 'react'
import { Box, Button, Modal, Typography } from '@mui/material';
import { styled } from 'styled-components';
import { Form, Formik, FormikState } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../../formik'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { ActionModalCategoryEnum } from '../../../enums'
import { CategoryI } from '../../../interfaces';
import { toogleModalCategory } from '../../../store/slices/admin/adminSlice';
import { postCategory, putCategory } from '../../../store/slices/admin/thunk';
import { ConfirmButton } from '.';





export const ModalCategory = () => {

    const {isOpenModalCategory, activeCategory} = useAppSelector(state => state.admin);
    const categoryId = useMemo(() => activeCategory?._id && activeCategory._id, [isOpenModalCategory])
    const dispatch = useAppDispatch();

    const initialValuesAdd:CategoryI= {
        categoryName: ''
    }

    const initialValuesEdit:CategoryI = {
        categoryName: activeCategory?.categoryName || ""
    }

    const validationSchema = Yup.object({
        categoryName: Yup.string().min(3,"Debe ser de un mínimo de 3 caracteres").max(20, "No debe tener más de 20 caracteres").required("Este campo es obligatorio"),
    })


    const handleSubmitAction = (values: CategoryI, resetForm: (nextState?: Partial<FormikState<CategoryI>> | undefined) => void) => {
        console.log(values)
        if(isOpenModalCategory.type === ActionModalCategoryEnum.ADD){
            dispatch(postCategory(values.categoryName))
            dispatch(toogleModalCategory(ActionModalCategoryEnum.NONE));
            return
        }

        const newCategory:CategoryI = {
            _id: categoryId,
            categoryName: values.categoryName
        }
        dispatch(putCategory(newCategory))
        dispatch(toogleModalCategory(ActionModalCategoryEnum.NONE));
    }

    return (
        <ModalContainer open={isOpenModalCategory.active}
            onClose={() => dispatch(toogleModalCategory(ActionModalCategoryEnum.NONE))}
        >
            <Box sx={{backgroundColor: "white"}} borderRadius={3} paddingX={4} paddingY={4}  display={"flex"} flexDirection={"column"} gap={5}>
                <Typography  variant='h4' textAlign={"center"} >
                    {isOpenModalCategory.type === ActionModalCategoryEnum.ADD ? "Agregar categoría" : "Editar categoría"} 
                </Typography>
                <Formik
                    initialValues={isOpenModalCategory.type === ActionModalCategoryEnum.ADD ? initialValuesAdd : initialValuesEdit}
                    onSubmit={(values:CategoryI, {resetForm}) => handleSubmitAction(values, resetForm)}
                    validationSchema={
                        validationSchema
                    }
                >
                    {
                        ({errors, handleSubmit}) => (
                            <Form>
                                <ContainerForm  >


                                    <MyTextInput error={errors.categoryName ? true : false} label='Nombre de la categoría' name='categoryName' />

                                    
                                    {/* <Button type='submit'
                                        variant='contained' 
                                        color={isOpenModalCategory.type === ActionModalCategoryEnum.ADD ? "primary" : "success"}
                                    >
                                        {isOpenModalCategory.type === ActionModalCategoryEnum.ADD ? "Agregar categoría" : "Editar categoría"} */}
                                    {/* </Button> */}
                                    <ConfirmButton handleSubmit={handleSubmit}/>

                                </ContainerForm>
                            </Form>
                        )
                    }
                </Formik>
                </Box>
        </ModalContainer>
    )
}



const ModalContainer = styled(Modal)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

const ContainerForm = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;