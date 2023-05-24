import {useState} from 'react'
import { Box, Button, FormControl, Typography, InputAdornment, IconButton, OutlinedInput} from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Form, Formik } from "formik"
import * as Yup from 'yup';
import { MyTextInput } from "../formik/MyTextInput";
import { useAppDispatch} from "../../hooks/reduxHook";
import { SignIn } from "../../store/slices/auth/thunk";
import { LoginI } from "../../interfaces";
import logo from '../../assets/Logo.png';






export const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    // const {token, user} = useAppSelector(state => state.auth);
    // const navigate = useNavigate();

    const handleLogin = ({email, password}:LoginI) => {
        dispatch(SignIn({email: email.toLowerCase(), password}));
    }


    const initialValues = {
        email: "",
        password: ""
    }

    
    return (
        <Box width={{md:"500px"}}  sx={{backgroundColor: "white"}} borderRadius={3} boxShadow={10} gap={5} paddingY={5} paddingX={5} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2} justifyContent={"center"} >
                <img src={logo} alt="Logo app"  className='logo'/>
                <Typography variant="h4">Inicio de Sesión</Typography>
            </Box>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => handleLogin(values)}
                validationSchema={
                    Yup.object({
                        email: Yup.string().email("El email no válido").required("El campo correo es obligatorio"),
                        password: Yup.string().min(8,"Debe ser de un minimo de 8 caracteres").required("El campo contraseña es obligatorio"),
                    })
                }
            >
                {
                    ({errors, handleChange}) => (
                        <Form>
                            <Box height={{xs:"auto",sm:"300px"}} width={{xs:"auto",sm:"300px", md:"400px"}} display={"flex"} flexDirection={"column"} gap={20}>
                                <FormControl>
                                    <Box display={"flex"} flexDirection={"column"} gap={6}>
                                        <MyTextInput error={errors.email ? true : false} name="email" label="Correo electrónico" placeholder="ejemplo@correo.com"/>
                                        {/* <MyTextInput error={errors.password ? true : false} name="password" label="Contraseña" type="password"/> */}
                                        
                                        <Box display={"flex"} flexDirection="column">
                                        <OutlinedInput
                                            id="standard-adornment-password"
                                            name='password'
                                            placeholder='Contraseña'
                                            error={errors.password ? true : false}
                                            onChange={handleChange}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    color={errors.password ? "error" : "default"}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />

                                        <Typography height={10} visibility={errors.password ? "visible" : "hidden"}  component={"span"} className='error'>
                                            {errors.password}
                                        </Typography>

                                    </Box>

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
