import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from '@/hooks';
import { logout } from '@/store';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <>
      <IconButton onClick={handleLogout}>
        <LogoutIcon sx={{ color: 'red', fontSize: { xs: 32 } }} />
        <Typography fontSize={'1rem'} color={'black'}>
          Cerrar sesión
        </Typography>
      </IconButton>
    </>
  );
};
