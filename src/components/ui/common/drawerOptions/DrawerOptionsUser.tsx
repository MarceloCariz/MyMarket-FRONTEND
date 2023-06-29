import { useNavigate } from 'react-router';
import { Avatar, IconButton, Typography } from '@mui/material';
import { styled } from 'styled-components';
import { CenterColumn } from '@/styles';

export const DrawerOptionsUser = () => {
  const navigate = useNavigate();

  return (
    <CenterColumn>
      <ButtonOption onClick={() => navigate('/home/profile')}>
        <Avatar />
        <Subtittle>Perfil</Subtittle>
      </ButtonOption>
    </CenterColumn>
  );
};

const Subtittle = styled(Typography)`
  color: black;
  font-size: 2rem;
`;

const ButtonOption = styled(IconButton)`
  gap: 1rem;
`;
