import { Box, Button, FormControl, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import * as Yup from 'yup';
import { MyTextInput } from "../formik/MyTextInput";
import { useAppDispatch} from "../../hooks/reduxHook";
import { SignIn } from "../../store/slices/auth/thunk";
import { LoginI } from "../../interfaces";






export const LoginForm = () => {

    const dispatch = useAppDispatch();
    // const {token, user} = useAppSelector(state => state.auth);
    // const navigate = useNavigate();

    const handleLogin = ({email, password}:LoginI) => {
        dispatch(SignIn({email, password}));
    }


    const initialValues = {
        email: "",
        password: ""
    }

    
    return (
        <Box sx={{backgroundColor: "white"}} borderRadius={3} boxShadow={10} gap={5} paddingY={5} paddingX={5} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box>
                <Typography variant="h4">Inicio de Sesión</Typography>
            </Box>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => handleLogin(values)}
                validationSchema={
                    Yup.object({
                        email: Yup.string().email("El email no valido").required("El campo correo es obligatorio"),
                        password: Yup.string().required("El campo contraseña es obligatorio"),
                    })
                }
            >
                {
                    ({errors}) => (
                        <Form>
                            <Box width={400} display={"flex"} flexDirection={"column"} gap={20}>
                                <FormControl>
                                    <Box display={"flex"} flexDirection={"column"} gap={6}>
                                        <MyTextInput error={errors.email ? true : false} name="email" label="Correo electronico" placeholder="ejemplo@correo.com"/>
                                        <MyTextInput error={errors.password ? true : false} name="password" label="Contraseña" type="password"/>
                                        <Button fullWidth variant="contained" type="submit">
                                            Iniciar Sesión
                                        </Button>
                                    </Box>

                                </FormControl>
                            </Box>
                        </Form>
                    )
                }
                

            </Formik>
        </Box>
    )
}
