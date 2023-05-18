import {useState, useMemo, useEffect} from 'react'
import {Modal, Box, Typography, Button, Input, CircularProgress} from '@mui/material'
import { Form, Formik } from 'formik';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import * as Yup from 'yup';
import { ProductI } from '../../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setActiveProduct, toogleModalProductActions } from '../../../../store/slices/product/productSlice';
import { createProduct, putProduct } from '../../../../store/slices/product/thunk';
import { MyTextArea , MyTextInput} from '../../../formik';
import { ConfirmButton } from './ConfirmButton';




export const ModalProduct = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [alerta, setAlerta] = useState({msg: '', error: false});
    const [imagenInfo, setImagenInfo] = useState<any>(null);


    const dispatch = useAppDispatch();

    const {isOpenModalProductActions, activeProduct:product} = useAppSelector(state => state.product);

    const activeProduct = useMemo(() =>  {return product} , [isOpenModalProductActions])

    useEffect(() => {
        if(isOpenModalProductActions.type === "edit"){
            setImagenInfo(activeProduct?.imgUrl)
            console.log(activeProduct?.imgUrl)
            return;
        }
        setImagenInfo(null)
    }, [activeProduct])


    const initialValuesAdd:ProductI = {
        title: "",
        description: "",
        price: 0,
        stock: 0,
    }



    const validationSchemaAdd = Yup.object({
        title: Yup.string().min(3,"Debe ser de un mínimo de 3 caracteres").max(20, "No debe tener más de 20 caracteres").required("Este campo es obligatorio"),
        description: Yup.string().min(3,"Debe ser de un mínimo de 3 caracteres").max(50, "No debe tener más de 50 caracteres").required("Este campo es obligatorio"),
        price: Yup.number().typeError("El precio debe ser un número").positive("El precio debe ser positivo").required("Este campo es obligatorio"),
        stock: Yup.number().typeError("El stock debe ser un número").positive("El stock debe ser positivo").required("Este campo es obligatorio"),
    })


    const initialValuesEdit = {
        title: activeProduct?.title,
        description: activeProduct?.description,
        price: activeProduct?.price,
        stock: activeProduct?.stock,
    }

    const validationSchemaEdit = Yup.object({
        title: Yup.string().min(3,"Debe ser de un mínimo de 3 caracteres").max(20, "No debe tener más de 20 caracteres").required("Este campo es obligatorio"),
        description: Yup.string().min(3,"Debe ser de un mínimo de 3 caracteres").max(70, "No debe tener más de 50 caracteres"),
        price: Yup.number().typeError("El precio debe ser un número").positive("El precio debe ser positivo").required("Este campo es obligatorio"),
        stock: Yup.number().typeError("El stock debe ser un número").positive("El stock debe ser positivo").required("Este campo es obligatorio"),
    })


    const onChangeInpuFile = (e:any) => {
        const imagen = e.target.files[0];
        setSelectedFile(imagen);
        const reader = new FileReader();
        reader.onload = (e) =>{
            const { result }:any = e.target;
            setImagenInfo(result);
        }
        reader.readAsDataURL(imagen);
    
    }

    const handleSubmitAction = (values: any, resetForm:any) => {
        if(selectedFile === null && isOpenModalProductActions.type === "add"){
            setAlerta({msg:"Por favor seleccione una imagen", error: true})
            setTimeout(() => {
                setAlerta({msg: '', error: false}); 
            }, 2000);
            return;
        }
        if(isOpenModalProductActions.type === "add"){
            dispatch(createProduct(values, selectedFile, resetForm))
            setSelectedFile(null);
            setImagenInfo(null);
            return;
        }
        if(activeProduct?.imgUrl !== imagenInfo){
            dispatch(putProduct({...values, _id: product?._id}, selectedFile))
            return
        }
        dispatch(putProduct({...values, _id: product?._id}))
    }

    return (
        <Modal open={isOpenModalProductActions.active}
            sx={{display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center"}}
            onClose={() => {
                dispatch(toogleModalProductActions(''));
                dispatch(setActiveProduct({product:null}));
            }}
        >
            <Box sx={{backgroundColor: "white"}} borderRadius={3} paddingX={4} paddingY={2}  display={"flex"} flexDirection={"column"} gap={5}>
                <Typography  variant='h4' textAlign={"center"} >
                    {isOpenModalProductActions.type === "add" ? "Agregar Producto" : "Editar Producto"} 
                </Typography>
                <Formik
                    initialValues={isOpenModalProductActions.type === "add" ? initialValuesAdd : initialValuesEdit}
                    onSubmit={(values, {resetForm}) => handleSubmitAction(values, resetForm)}
                    validationSchema={
                        isOpenModalProductActions.type === "add" ? validationSchemaAdd : validationSchemaEdit
                    }
                >
                    {
                        ({handleSubmit}) => (
                            <Form>
                                <Box   width={{xs:"100%",sm:"400px"}} display={"flex"} flexDirection={"column"} gap={2}>

                                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
                                        {imagenInfo !== null &&(
                                            <img src={
                                                imagenInfo
                                            } alt="imagen" width={"100"} />)
                                        }
                                        <Typography  sx={{display:"flex", alignItems:"center", cursor:"pointer"}}  component={"label"}  htmlFor="file">
                                            <AddPhotoAlternateIcon fontSize='large'/>
                                            {selectedFile !== null ? "Actualizar imagen" : "Haz clic aquí para subir tu imagen"}</Typography>

                                        
                                        <Input  style={{display: 'none'}} id="file"  type="file" onChange={onChangeInpuFile} />
                                        {
                                            alerta.error === true && (
                                                <Typography className='error'>{alerta.msg}</Typography>
                                            )
                                        }
                                    </Box>

                                    <MyTextInput label='Nombre del producto' name='title' />
                                    <MyTextInput label='Precio' name='price'/>
                                    <MyTextInput label='Stock' name='stock'/>

                                    {/* <textarea onChange={handleChange} placeholder='Descripción del producto' name="description" id="" cols={30} rows={10}></textarea>
                                    {
                                        errors.description && (
                                            <Typography className='error'>{errors.description}</Typography>
                                        )
                                    } */}
                                    <MyTextArea style={{minHeight: "60px"}} name='description' placeholder='Descripción del producto'  />

                                    <ConfirmButton handleSubmit={handleSubmit}/>

                                </Box>
                            </Form>
                        )
                    }
                </Formik>
            </Box>
        </Modal>
    )
}
