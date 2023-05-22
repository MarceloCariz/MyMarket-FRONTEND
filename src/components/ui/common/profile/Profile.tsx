import {useState, MouseEvent, useEffect} from 'react'
import { Box, Fade, Paper, Popper, Typography, Avatar, PopperPlacementType , IconButton, Divider} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { LogoutButton } from '../drawerOptions';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';




export const Profile = () => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<PopperPlacementType>();

    let timer : ReturnType<typeof setTimeout>;

    const navigate = useNavigate();

    const handleClick =
        (newPlacement: PopperPlacementType) =>
        (event: MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
            // handleMouseLeave();
    };


    const handleMouseLeave = () => {
        // Iniciar un temporizador para cerrar el elemento después de 10 segundos
        const timer = setTimeout(() => setOpen(false), 5000);
    };

    const handleMouseEnter = () => {
        clearTimeout(timer);
    };
    
      // Limpiar el temporizador cuando el componente se desmonta
    useEffect(() => {
            return () => {
                clearTimeout(timer);
            };
    }, []);


    return (
        <Box>
            <IconButton onClick={handleClick('bottom-end')}  >
                <Avatar />
            </IconButton>
            <Popper open={open} onMouseEnter={handleMouseEnter}  onMouseLeave={handleMouseLeave} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                        <ContainerOptions>
                            <IconButton onClick={() => navigate('profile')}>
                                <AccountBoxIcon/>
                                <Typography variant="subtitle1" color={"black"} >Perfil</Typography>
                            </IconButton>
                            <Divider/>
                            <LogoutButton/>
                        </ContainerOptions>
                    </Paper>
                </Fade>
            )}
            </Popper>
        </Box>
    )
}


const ContainerOptions = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 1rem 2rem 1rem 2rem;
    
`;