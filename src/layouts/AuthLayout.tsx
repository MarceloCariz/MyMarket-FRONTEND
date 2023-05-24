import { Box} from "@mui/material"
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks";
import { getUserByToken } from "../store/slices/auth/thunk";
import { ToastContainer } from "react-toastify";
import { RolesEnum } from "../enums";


const AuthPageLayout = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {token, user} = useAppSelector(state => state.auth);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(user) return;
        if(token){
            dispatch(getUserByToken());
        }
    },[token])

    useEffect(()=>{
        if(user?.roles.includes(RolesEnum.USER)) return navigate("/home");

        if(user?.roles.includes(RolesEnum.SHOP)) return navigate("/shop");

    },[user]);

    return (
            // <Container  maxWidth={"xl"}  >
            <Box >
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
            // </Container>
    )
}

export  {AuthPageLayout}