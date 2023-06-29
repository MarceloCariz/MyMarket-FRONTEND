import { IconButton, OutlinedInput } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toogleModalMap } from '@/store';

export const AddressInput = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.user);

  return (
    <OutlinedInput
      placeholder={profile?.address === '' ? 'Seleccione una dirección' : profile?.address}
      disabled={true}
      sx={{
        input: {
          '&::placeholder': {
            // <----- Add this.
            opacity: 1,
          },
        },
        width: '400px',
      }}
      endAdornment={
        <IconButton onClick={() => dispatch(toogleModalMap())}>
          <MapIcon fontSize='medium' color='primary' />
        </IconButton>
      }
    />
  );
};
