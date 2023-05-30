import {useEffect} from 'react'
import {  Typography, Button } from "@mui/material";
import { Form, Formik } from "formik";
import {styled} from 'styled-components'
import * as Yup from 'yup';
import { UserProfileI } from "../../../interfaces/user";
import {  MyTextInput } from "../../formik";
import { CenterColumn, ContainerCenter } from "../../../styles/styles";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getProfileUser, updateProfileUser } from '../../../store/slices/user/thunk';




export const ProfileForm = () => {



    const {profile} = useAppSelector(state => state.user);
    const {user} = useAppSelector(state => state.auth);


    const dispatch = useAppDispatch();




    useEffect(() => {
        console.log(profile)
        if(!user) return;
        dispatch(getProfileUser());
    }, [user]);




    const initialValues: UserProfileI = {
        name: profile?.name || "",
        lastName: profile?.lastName || "",
        address: profile?.address || "",
    }




    const validationSchema = Yup.object({
            name: Yup.string().min(3, "Debe tener un minimo de 3 caracteres")
            .max(20,"No debe superar los 20 caracteres").matches(/^[a-zA-Z]+$/, 'Solo se permiten letras').optional(),

            lastName: Yup.string().min(3, "Debe tener un minimo de 3 caracteres")
            .max(20,"No debe superar los 20 caracteres").matches(/^[a-zA-Z]+$/, 'Solo se permiten letras').optional(),

            address: Yup.string().min(5, "Debe tener un minimo de 3 caracteres")
            .max(30,"No debe superar los 20 caracteres").optional(),
    })
    
    
    const handleSubmit = (values: UserProfileI) => {
        dispatch(updateProfileUser(values));
    }


    return (
        <ContainerCenter>
            <Formik
                onSubmit={(values) => handleSubmit(values)}
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
            >
                {
                    () => (
                        <Form>
                            <Typography variant="h5" textAlign={"center"}>Perfil</Typography>
                            <Container  boxShadow={2} padding={5} borderRadius={2}>
                                <MyTextInput label="Nombre" name="name"/>
                                <MyTextInput label="Apellido" name="lastName"/>
                                <MyTextInput label="Direccíon" name="address"/>

                                <Button variant='contained' color='success' type="submit">
                                    Guardar cambios
                                </Button>
                            </Container>
                        </Form>
                    )
                }



            </Formik>
        </ContainerCenter>
    )
}



const Container = styled(CenterColumn)`
    width: 300px;
    gap: 2rem;
    margin-top: 1rem;
`;