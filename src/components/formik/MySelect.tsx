import { ErrorMessage, useField } from 'formik';
import { Select, Typography } from '@mui/material';

interface Props {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  [x: string]: any;
}

export const MySelect = ({ label, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <>
      <Select
        defaultValue={'seleccione'}
        label={label}
        variant='outlined'
        fullWidth
        {...field}
        {...props}
      />
      <Typography color={'error'}>
        <ErrorMessage name={props.name} component='span' className='error' />
      </Typography>
    </>
  );
};
