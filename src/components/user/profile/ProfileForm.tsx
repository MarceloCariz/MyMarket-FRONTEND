import { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { styled } from 'styled-components';
import * as Yup from 'yup';
import { UserProfileI } from '@/interfaces';
import { MyTextInput, AddressInput } from '@/components';
import { CenterColumn, ContainerCenter } from '@/styles';
import { useAppDispatch, useAppSelector, useLocation } from '@/hooks';
import { getProfileUser, updateProfileUser } from '@/store';

export const ProfileForm = () => {
  const { profile } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);

  const { permissionDenied, ActivateLocationClick } = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    dispatch(getProfileUser());
  }, [dispatch, user]);

  const initialValues: UserProfileI = {
    name: profile?.name || '',
    lastName: profile?.lastName || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Debe tener un minimo de 3 caracteres')
      .max(20, 'No debe superar los 20 caracteres')
      .matches(/^[a-zA-Z]+$/, 'Solo se permiten letras')
      .required('El nombre es requerido'),

    lastName: Yup.string()
      .min(3, 'Debe tener un minimo de 3 caracteres')
      .max(20, 'No debe superar los 20 caracteres')
      .matches(/^[a-zA-Z]+$/, 'Solo se permiten letras')
      .required('El apellido es requerido'),
  });

  const handleSubmit = (values: UserProfileI) => {
    dispatch(updateProfileUser(values));
  };

  return (
    <ContainerCenter>
      <Formik
        onSubmit={(values) => handleSubmit(values)}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {() => (
          <Form>
            <Typography variant='h5' textAlign={'center'}>
              Datos personales
            </Typography>
            <Container boxShadow={1} padding={5} borderRadius={2}>
              <MyTextInput label='Nombre' name='name' fullWidth sx={{ width: '400px' }} />
              <MyTextInput label='Apellido' name='lastName' sx={{ width: '400px' }} />
              {permissionDenied ? (
                <Button onClick={ActivateLocationClick}>
                  Active la ubicación para obtener su dirección
                </Button>
              ) : (
                <AddressInput />
              )}
              <Button variant='contained' color='success' type='submit'>
                Guardar cambios
              </Button>
            </Container>
          </Form>
        )}
      </Formik>
    </ContainerCenter>
  );
};

const Container = styled(CenterColumn)`
  width: 600px;
  gap: 2rem;
  margin-top: 1rem;
`;
