import {useState, useMemo, useEffect} from 'react'
import {Modal, Box, Typography, Input, MenuItem} from '@mui/material'
import { Form, Formik,  FormikState } from 'formik';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import * as Yup from 'yup';
import { ProductI } from '../../../../interfaces';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setActiveProduct, toogleModalProductActions } from '../../../../store/slices/product/productSlice';
import { createProduct, getCategories, putProduct } from '../../../../store/slices/product/thunk';
import { MySelect, MyTextArea , MyTextInput} from '../../../formik';
import { ConfirmButton } from './ConfirmButton';
import { ActionModalProductsEnum } from '../../../../enums';




export const ModalProduct = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [alerta, setAlerta] = useState({msg: '', error: false});
    const [imagenInfo, setImagenInfo] = useState< string | null | undefined  >(null);


    const dispatch = useAppDispatch();

    const {isOpenModalProductActions, activeProduct:product, categories} = useAppSelector(state => state.product);

    const activeProduct = useMemo(() =>  {return product} , [isOpenModalProductActions])

    useEffect(() => {
        dispatch(getCategories());
        console.log(product)
    },[])


    useEffect(() => {
        if(isOpenModalProductActions.type === "edit"){
            setImagenInfo(activeProduct?.imgUrl)
            return;
        }
        setImagenInfo(null);
    }, [activeProduct])


    const getCategoriesIds = () => {
        return categories.length > 0 ?  categories.map(({_id}) => _id) : [];
    }

    const initialValuesAdd:ProductI = {
        title: "",
        description: "",
        price: 0,
        stock: 0,
        category: "seleccione",
    }



    const validationSchemaAdd = Yup.object({
        title: Yup.string().min(3,"Debe ser de un mínimo de 3 caracteres").max(20, "No debe tener más de 20 caracteres").required("Este campo es obligatorio"),
        description: Yup.string().min(3,"Debe ser de un mínimo de 3 caracteres").max(50, "No debe tener más de 50 caracteres"),
        price: Yup.number().typeError("El precio debe ser un número").positive("El precio debe ser positivo").required("Este campo es obligatorio"),
        stock: Yup.number().integer("El stock debe ser un número entero").typeError("El stock debe ser un número").positive("El stock debe ser positivo").required("Este campo es obligatorio"),
        category: Yup.string().oneOf(getCategoriesIds(), "Categoría incorrecta").required("Este campo es obligatorio"),
    })


    const initialValuesEdit:ProductI = {
        title: activeProduct?.title || "",
        description: activeProduct?.description || "",
        price: activeProduct?.price || 0,
        stock: activeProduct?.stock || 0,
        category: activeProduct?.category || "",
    }

    const validationSchemaEdit = Yup.object({
        title: Yup.string().min(3,"Debe ser de un mínimo de 3 caracteres").max(20, "No debe tener más de 20 caracteres").required("Este campo es obligatorio"),
        description: Yup.string().min(3,"Debe ser de un mínimo de 3 caracteres").max(70, "No debe tener más de 50 caracteres"),
        price: Yup.number().typeError("El precio debe ser un número").positive("El precio debe ser positivo").required("Este campo es obligatorio"),
        stock: Yup.number().integer("El stock debe ser un número entero").typeError("El stock debe ser un número").positive("El stock debe ser positivo").required("Este campo es obligatorio"),
        category: Yup.string().oneOf(getCategoriesIds(), "Categoría incorrecta").required("Este campo es obligatorio"),
    })


    const onChangeInpuFile = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const imagen = e.target.files?.[0];
        if(!imagen) return;
        setSelectedFile(imagen);
        const reader = new FileReader();
        reader.onload = (e) =>{
            const result = e.target?.result ? e.target.result.toString() : "";
            setImagenInfo(result);
        }
        reader.readAsDataURL(imagen);
    
    }

    const handleSubmitAction = (values: ProductI, resetForm: (nextState?: Partial<FormikState<ProductI>> | undefined) => void) => {

        if(selectedFile === null && isOpenModalProductActions.type === ActionModalProductsEnum.ADD){
            setAlerta({msg:"Por favor seleccione una imagen", error: true})
            setTimeout(() => {
                setAlerta({msg: '', error: false}); 
            }, 2000);
            return;
        }
        
        if(isOpenModalProductActions.type === ActionModalProductsEnum.ADD && selectedFile !== null){
            dispatch(createProduct(values, selectedFile, resetForm))
            setSelectedFile(null);
            setImagenInfo(null);
            return;
        }
        if(activeProduct?.imgUrl !== imagenInfo && selectedFile ){
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
            <Box sx={{backgroundColor: "white"}} borderRadius={3} paddingX={4} paddingY={4}  display={"flex"} flexDirection={"column"} gap={5}>
                <Typography  variant='h4' textAlign={"center"} >
                    {isOpenModalProductActions.type === ActionModalProductsEnum.ADD ? "Agregar Producto" : "Editar Producto"} 
                </Typography>
                <Formik
                    initialValues={isOpenModalProductActions.type === ActionModalProductsEnum.ADD ? initialValuesAdd : initialValuesEdit}
                    onSubmit={(values:ProductI, {resetForm}) => handleSubmitAction(values, resetForm)}
                    validationSchema={
                        isOpenModalProductActions.type === ActionModalProductsEnum.ADD ? validationSchemaAdd : validationSchemaEdit
                    }
                >
                    {
                        ({handleSubmit, values}) => (
                            <Form>
                                <Box  width={{xs:"100%",sm:"400px"}} display={"flex"} flexDirection={"column"} gap={2}>

                                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
                                        {imagenInfo !== null &&(
                                            <img src={imagenInfo} alt="imagen" width={"100"} />)
                                        }

                                        <Typography  sx={{display:"flex", alignItems:"center", cursor:"pointer"}}  component={"label"}  htmlFor="file">
                                            
                                            <AddPhotoAlternateIcon fontSize='large'/>
                                            {selectedFile !== null ? "Actualizar imagen" : "Haz clic aquí para subir tu imagen"}
                                        
                                        </Typography>

                                        
                                        <Input  style={{display: 'none'}} id="file"  type="file" onChange={onChangeInpuFile} />
                                        {
                                            alerta.error === true && (
                                                <Typography className='error'>{alerta.msg}</Typography>
                                            )
                                        }

                                    </Box>

                                    <MyTextInput label='Nombre del producto' name='title' />
                                    <MyTextInput label={`Precio: ${Number(values.price).toLocaleString("es-CL",{style: 'currency',currency: "clp"})}`} name='price'/>
                                    <MyTextInput label='Stock' name='stock'/>
                                    
                                    <MySelect label='Categoría' name='category' > 
                                        <MenuItem value="seleccione">Seleccione una categoría</MenuItem>
                                        {
                                            categories.map(({categoryName, _id}) => (
                                                <MenuItem key={_id} value={_id}>
                                                    <Typography textTransform={"capitalize"}>{categoryName}</Typography>
                                                </MenuItem>
                                            ))
                                        }
                                    </MySelect>

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

