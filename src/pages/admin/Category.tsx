import { Box } from '@mui/material';
import { CenterColumn } from '@/styles';
import { AddCategoryButton, ModalCategory, TableCategory } from '@/components';

const Category = () => {
  return (
    <Box marginTop={10}>
      <ModalCategory />

      <CenterColumn gap={2}>
        <AddCategoryButton />

        <TableCategory />
      </CenterColumn>
    </Box>
  );
};

export default Category;
