import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  AppBar as AppBarMui,
  Toolbar,
  Container,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout, toogleDrawer } from '@/store';
import { RolesEnum } from '@/enums';
import { Profile, SearchBar, Cart } from '@/components';
import logo from '@/assets/Logo.png';

export const AppBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { profile } = useAppSelector((state) => state.user);

  const { isOpenSearch } = useAppSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMui color='primary' elevation={2} position='static'>
        <Container maxWidth='xl'>
          <Toolbar>
            <Box display={'flex'} flexGrow={1} alignItems={'center'}>
              <Link
                to={
                  user?.roles.includes(RolesEnum.USER)
                    ? '/home'
                    : user?.roles.includes(RolesEnum.SHOP)
                    ? '/shop'
                    : '/'
                }
                style={{ textDecoration: 'none' }}
              >
                <IconButton>
                  <img
                    src={logo}
                    alt='logo app'
                    style={{ width: '50px', color: 'white', filter: 'invert(100%)' }}
                  />
                  <Typography
                    display={{ xs: 'none', sm: 'flex', md: 'flex' }}
                    marginLeft={2}
                    variant='h4'
                    color='white'
                    sx={{ flexGrow: 1, fontSize: { xs: 28, md: 36 } }}
                  >
                    MyMarket
                  </Typography>
                </IconButton>
              </Link>
            </Box>

            {/* USUARIO */}
            {user?.roles.includes(RolesEnum.USER) && (
              <Box display={'flex'} flexGrow={{ xs: '1', md: '1' }} gap={2} alignItems={'center'}>
                <SearchBar />
                <LocationOnIcon
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                  htmlColor='rgb(235, 0, 20)'
                />
                <Typography
                  variant='h5'
                  display={{ xs: 'none', sm: 'none', md: 'flex' }}
                  color='white'
                  component='div'
                  sx={{ flexGrow: 1, fontSize: { xs: 20, md: 25 } }}
                >
                  {profile?.address ? profile.address.split(',')[0] : 'Aun no hay dirección'}
                </Typography>
                {!isOpenSearch && <Cart />}
              </Box>
            )}

            <Box sx={{ flexGrow: 0 }} display={'flex'} alignItems={'center'}>
              <Typography
                display={{ xs: 'none', sm: 'flex' }}
                textTransform={'capitalize'}
                variant='h6'
              >
                {user?.username}
              </Typography>

              {!isOpenSearch && <Profile />}
              <Tooltip title='Salir' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <IconButton onClick={handleLogout}>
                  <LogoutIcon sx={{ color: 'white', fontSize: { xs: 32, md: 42 } }} />
                </IconButton>
              </Tooltip>
              <IconButton aria-label='menu' onClick={() => dispatch(toogleDrawer())} size={'large'}>
                <MenuIcon sx={{ color: 'white', fontSize: '3.5rem' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBarMui>
    </Box>
  );
};
