import {Modal, Box, Typography, Button} from '@mui/material'
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ProductI } from '../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toogleModalProductActions } from '../../../store/slices/product/productSlice';
import { MyTextInput } from '../../formik/MyTextInput';




export const ModalProduct = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalProductActions} = useAppSelector(state => state.product);

    const initialValuesAdd:ProductI = {
        title: "",
        description: "",
        price: 0,
        stock: 0,
    }



    const validationSchemaAdd = Yup.object({
        title: Yup.string().min(3,"Debe ser de un minimo de 3 caracteres").max(20, "No debe tener mas de 20 caracteres").required("Este campo es obligatorio"),
        description: Yup.string().min(3,"Debe ser de un minimo de 3 caracteres").max(50, "No debe tener mas de 50 caracteres").required("Este campo es obligatorio"),
        price: Yup.number().typeError("El precio debe ser un numero").positive("El precio debe ser positivo").required("Este campo es obligatorio"),
        stock: Yup.number().typeError("El stock debe ser un numero").positive("El stock debe ser positivo").required("Este campo es obligatorio"),
    })


    const initialValuesEdit = {
        
    }

    const validationSchemaEdit = Yup.object({
        title: Yup.string().min(3,"Debe ser de un minimo de 3 caracteres").max(20, "No debe tener mas de 20 caracteres").required("Este campo es obligatorio"),
        description: Yup.string().min(3,"Debe ser de un minimo de 3 caracteres").max(50, "No debe tener mas de 50 caracteres"),
        price: Yup.number().typeError("El precio debe ser un numero").positive("El precio debe ser positivo").required("Este campo es obligatorio"),
        stock: Yup.number().typeError("El stock debe ser un numero").positive("El stock debe ser positivo").required("Este campo es obligatorio"),
    })

    return (
        <Modal open={isOpenModalProductActions.active}
            sx={{display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center"}}
            onClose={() => dispatch(toogleModalProductActions(''))}
        >
            <Box sx={{backgroundColor: "white"}} borderRadius={3} paddingX={4} paddingY={2}  display={"flex"} flexDirection={"column"} gap={5}>
                <Typography  variant='h4' textAlign={"center"} >Agregar Producto</Typography>
                <Formik
                    initialValues={isOpenModalProductActions.type === "add" ? initialValuesAdd : initialValuesAdd}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={
                        isOpenModalProductActions.type === "add" ? validationSchemaAdd : validationSchemaEdit
                    }
                >
                    {
                        ({errors, handleChange}) => (
                            <Form>
                                <Box width={400} display={"flex"} flexDirection={"column"} gap={2}>
                                    <MyTextInput label='Nombre del producto' name='title' />
                                    <MyTextInput label='Precio' name='price'/>
                                    <MyTextInput label='Stock' name='stock'/>

                                    <textarea onChange={handleChange} placeholder='Descripción del producto' name="description" id="" cols={30} rows={10}></textarea>
                                    {
                                        errors.description && (
                                            <Typography className='error'>{errors.description}</Typography>
                                        )
                                    }


                                    <Button type="submit" variant='contained' color={isOpenModalProductActions.type === "add" ? 'primary' : 'success'}>
                                        {isOpenModalProductActions.type === "add" ? "Agregar" : "Editar"}{" "}producto
                                    </Button>
                                </Box>
                            </Form>
                        )
                    }
                </Formik>
            </Box>
        </Modal>
    )
}
