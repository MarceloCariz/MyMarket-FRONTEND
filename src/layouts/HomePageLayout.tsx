import { useEffect } from "react";
import { Outlet , useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { ToastContainer } from "react-toastify";
import {Container, Box} from "@mui/material";
import { getUserByToken } from "../store/slices/auth/thunk";

import 'react-toastify/dist/ReactToastify.css';
import { AppBar, DrawerUi } from "../components";
import { RolesEnum } from "../enums";
import { setCart } from "../store/slices/cart/cartSlice";



const HomePageLayout = () => {
    const token = localStorage.getItem("token");
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth);
    const {cart } = useAppSelector(state => state.cart);

    const navigate = useNavigate();



    useEffect(()=>{
        if(!token) return navigate("/");
        dispatch(getUserByToken());
    },[])

    useEffect(()=>{
        if(!user) return navigate("/");
    },[])

    useEffect(() => {
        if(user && !user?.roles.includes(RolesEnum.USER)) return navigate("/");
    }, [user])

    useEffect(() => {
        const cartStorage = localStorage.getItem("cart");
        if(cartStorage){
            dispatch(setCart({cart: JSON.parse(cartStorage) } ));
        }
    },[])

    return (
        <> 
            <AppBar/>
            <DrawerUi/>
            <Container maxWidth={"xl"}  >
            <Box marginTop={4}>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
                <Outlet/>
            </Box>
            </Container>
        </>
    )
}

export  {HomePageLayout}