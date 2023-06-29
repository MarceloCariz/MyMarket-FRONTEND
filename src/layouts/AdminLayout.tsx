import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container, Box } from '@mui/material';
import { getUserByToken } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RolesEnum } from '@/enums';
import { AppBar, DrawerUi } from '@/components';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = () => {
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/');
    if (user && !user.roles.includes(RolesEnum.ADMIN)) return navigate('/home');
    if (user === null && token) {
      dispatch(getUserByToken());
    }
  }, [dispatch, navigate, token, user]);

  if (!user) return <h1>Unathorized</h1>;

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

export { AdminLayout };
