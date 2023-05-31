import { useEffect } from "react";
import { Outlet , useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { ToastContainer } from "react-toastify";
import {Container, Box} from "@mui/material";
import { getUserByToken } from "../store/slices/auth/thunk";
import { AppBar, DrawerUi } from "../components";
import { RolesEnum } from "../enums";
import { setCart } from "../store/slices/cart/cartSlice";
import 'react-toastify/dist/ReactToastify.css';
import { getProfileUser } from "../store/slices/user/thunk";




const HomePageLayout = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth);
    const {cart } = useAppSelector(state => state.cart);

    const navigate = useNavigate();

    const tokenStorage = localStorage.getItem("token");


    useEffect(()=>{
        if(!tokenStorage) return navigate("/");

        if(!user) {
            dispatch(getUserByToken());
        }  

    },[])

    useEffect(() => {
        if(user){
            dispatch(getProfileUser());
        }
    },[user])


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
            <Box marginTop={10}  height={20}>

            </Box>
        </>
    )
}

export  {HomePageLayout}