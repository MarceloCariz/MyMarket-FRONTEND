import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUserByToken } from '@/store';
import { RolesEnum } from '@/enums';

const AuthPageLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user) return;
    if (token) {
      dispatch(getUserByToken());
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    if (user?.roles.includes(RolesEnum.USER)) return navigate('/home');

    if (user?.roles.includes(RolesEnum.SHOP)) return navigate('/shop');

    if (user?.roles.includes(RolesEnum.ADMIN)) return navigate('/dashboard');
  }, [navigate, user]);

  return (
    <Box>
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
  );
};

export { AuthPageLayout };
