import { Box, Modal, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toogleModalMap } from '@/store';
import { MapView } from '@/components';
import { CenterColumn } from '@/styles';

export const ModalMap = () => {
  const { isModalMapOpen } = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={isModalMapOpen}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClose={() => dispatch(toogleModalMap())}
    >
      <CenterColumn sx={{ backgroundColor: 'white' }} padding={4} borderRadius={2}>
        <Typography variant='h5' marginBottom={4}>
          Seleccione su dirección actual
        </Typography>
        <Box>
          <MapView />
        </Box>
      </CenterColumn>
    </Modal>
  );
};
