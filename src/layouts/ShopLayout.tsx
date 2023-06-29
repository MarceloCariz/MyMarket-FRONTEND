import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container, Box } from '@mui/material';
import { getUserByToken } from '@/store';
import { AppBar, DrawerUi } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RolesEnum } from '@/enums';
import 'react-toastify/dist/ReactToastify.css';

const ShopLayout = () => {
  const tokenStorage = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('!');
    if (!tokenStorage) return navigate('/');

    if (!user) {
      dispatch(getUserByToken());
    }
  }, [dispatch, navigate, tokenStorage, user]);

  useEffect(() => {
    if (user && !user?.roles.includes(RolesEnum.SHOP)) return navigate('/');
  }, [navigate, user]);

  if (!tokenStorage && !user) return <h1>Unathorized</h1>;

  return (
    <>
      <AppBar />
      <DrawerUi />
      <Container maxWidth={'xl'}>
        <Box marginTop={4}>
          <ToastContainer
            position='top-center'
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme='light'
          />
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export { ShopLayout };
