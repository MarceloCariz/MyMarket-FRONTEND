import {Link, useNavigate} from 'react-router-dom'
import { Box , Typography, IconButton, AppBar as AppBarMui, Toolbar,Container, Tooltip, Avatar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toogleDrawer } from '../../../store/slices/ui/uiSlice';
import { logout } from '../../../store/slices/auth/authSlice';
import { RolesEnum } from '../../../enums';
import { Cart } from '../..';


export const AppBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth);


    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBarMui color='primary'   elevation={2} position="static">
                <Container maxWidth="xl">
                    <Toolbar sx={{display: "flex"}}>
                        <Box display={"flex"} flexGrow={1} alignItems={"center"}>


                            <Link to={user?.roles.includes(RolesEnum.USER) ? "/home" : "/dashboard"} style={{textDecoration: 'none'}}>
                                <Typography variant="h4"   color="white" component="div" sx={{ flexGrow: 1, fontSize:{xs: 28, md: 36}}}>
                                    MyMarket
                                </Typography>
                            </Link>
                        </Box>
                        {
                            user?.roles.includes(RolesEnum.USER) && (
                            <Box  display={"flex"} flexGrow={{xs:"0",md:"1"}} alignItems={"center"}>
                                <LocationOnIcon sx={{display:{xs:"none", md:"flex"}}} htmlColor='rgb(235, 0, 20)'/>
                                <Typography variant="h5" display={{xs:"none", sm:"flex"}}   color="white" component="div" sx={{ flexGrow: 1, fontSize:{xs: 20, md: 25}}}>
                                    Dirección del usuario
                                </Typography>
                                <Cart/>
                            </Box>)
                        }



                        <Box sx={{flexGrow: 0}} display={"flex"} alignItems={"center"}>
                            <Typography visibility={{xs:"hidden",md:"visible"}} textTransform={"capitalize"} variant='h6'>{user?.username}</Typography>
                            <Tooltip title="Perfil">
                                <IconButton>
                                    <Avatar />
                                </IconButton>
                            </Tooltip>
                            <Tooltip  title="Salir">
                                <IconButton  onClick={handleLogout}>
                                    <LogoutIcon  sx={{color:"white", fontSize:{xs:32,md:42}}}/>
                                </IconButton>
                            </Tooltip>
                            <IconButton
                                aria-label="menu"
                                onClick={()=>dispatch(toogleDrawer())} size={"large"}
                            >
                                <MenuIcon sx={{color:"white", fontSize: "3.5rem"}} />
                            </IconButton>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBarMui>
        </Box>
    )
}