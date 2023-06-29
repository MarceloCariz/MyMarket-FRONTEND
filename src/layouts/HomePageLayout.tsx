import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { AppBar, DrawerUi } from '@/components';
import { RolesEnum } from '@/enums';
import { getProfileUser, setCart, getUserByToken } from '@/store';
import { mymarketApi } from '@/api';
import 'react-toastify/dist/ReactToastify.css';

const HomePageLayout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);

  const navigate = useNavigate();

  const tokenStorage = localStorage.getItem('token');

  useEffect(() => {
    if (!tokenStorage) return navigate('/');

    if (!user) {
      dispatch(getUserByToken());
    }
  }, [dispatch, navigate, tokenStorage, user]);

  useEffect(() => {
    if (user) {
      dispatch(getProfileUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && !user.roles.includes(RolesEnum.USER)) return navigate('/');
  }, [navigate, user]);

  useEffect(() => {
    if (!user) return;
    try {
      const getCookiesCart = async () => {
        const { data } = await mymarketApi.get('/user/getcart');
        dispatch(setCart({ cart: data }));
      };
      getCookiesCart();
    } catch (error) {
      console.log(error);
      dispatch(setCart({ cart: [] }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) return;
    const setCookie = async () => {
      await mymarketApi.post('/user/setcart', { cart: JSON.stringify(cart), uid: user.uid });
    };
    setCookie();
  }, [cart, user]);

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
      <Box marginTop={10} height={20}></Box>
    </>
  );
};

export { HomePageLayout };
