import { useEffect } from "react";
import { Outlet , useNavigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {Container, Box} from "@mui/material";
import Cookie from 'js-cookie'
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getUserByToken } from "../store/slices/auth/thunk";
import { AppBar, DrawerUi } from "../components";
import { RolesEnum } from "../enums";
import { setCart } from "../store/slices/cart/cartSlice";
import { getProfileUser } from "../store/slices/user/thunk";
import 'react-toastify/dist/ReactToastify.css';
import mymarketApi from "../api/mymarketApi";





const HomePageLayout = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth);
    const {cart} = useAppSelector(state => state.cart);


    const navigate = useNavigate();

    const tokenStorage = localStorage.getItem("token");


    useEffect(()=>{
        if(!tokenStorage) return navigate("/");

        if(!user) {
            dispatch(getUserByToken());
        }  

    },[])
    if(!tokenStorage && !user) return ;

    useEffect(() => {
        if(user){
            dispatch(getProfileUser());
        }
    },[user])


    useEffect(() => {
        if(user && !user?.roles.includes(RolesEnum.USER)) return navigate("/");
    }, [user])



    useEffect(() => {
        if(!user?.uid) return;
        try {
            const getCookiesCart = async () => {
                const {data} = await mymarketApi.get('/user/getcart');
                // console.log(data)
                dispatch(setCart({cart: data } ));
            } 
            getCookiesCart();
        } catch (error) {
            console.log(error)
            dispatch(setCart({cart: [] } ));
            
        }

    },[user?.uid])

    useEffect(()=> {
        if(!user?.uid) return;
        const setCookie = async() => {
            await mymarketApi.post('/user/setcart',{cart:JSON.stringify(cart),uid: user?.uid} )
        }
        setCookie();

    },[cart, user?.uid]);

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