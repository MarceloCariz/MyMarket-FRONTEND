import {  IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from "../../../../hooks"
import { logout } from "../../../../store/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";





export const LogoutButton = () => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }
    return (
        <>
            <IconButton  onClick={handleLogout}>
                <LogoutIcon  sx={{color:"red", fontSize:{xs:32,md:42}}}/>
                <Typography variant="subtitle1" color={"black"}>Cerrar sesión</Typography>
            </IconButton>
        </>
    )
}
