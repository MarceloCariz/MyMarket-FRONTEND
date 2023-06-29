import { IconButton, Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { styled } from 'styled-components';
import { CenterColumn } from '@/styles';
import { useNavigate } from 'react-router';

export const DrawerOptionsAdmin = () => {
  const navigate = useNavigate();

  return (
    <CenterColumn>
      <ButtonOption onClick={() => navigate('/dashboard/category')}>
        <CategoryIcon />
        <Subtittle>Categorías</Subtittle>
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
