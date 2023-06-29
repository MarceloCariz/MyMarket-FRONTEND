import { mymarketApi } from '@/api';
import { toastError, toastSuccess } from '@/components';
import { CategoryI } from '@/interfaces';
import { AppDispatch, RootState } from '@/store';
import { addCategory, removeCategory, setCategoriesAdmin, updateCategory } from '@/store';

// Categories

export const postCategory = (categoryName: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await mymarketApi.post('category/create', { categoryName });

      dispatch(addCategory(data));
      toastSuccess('Categoría agregada correctamente');
    } catch (error) {
      console.log(error);
      toastError('Hubo un error');
    }
  };
};

export const deleteCategory = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { activeCategory } = getState().admin;
      if (!activeCategory?._id) return;

      await mymarketApi.delete(`category/delete/${activeCategory._id}`);
      dispatch(removeCategory(activeCategory._id));
      toastSuccess('Eliminada correctamente');
    } catch (error) {
      console.log(error);
      toastError('hubo un error');
    }
  };
};

export const getCategoriesAdmin = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await mymarketApi('category');

      dispatch(setCategoriesAdmin(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const putCategory = (values: CategoryI) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { _id, categoryName } = values;
      const { data } = await mymarketApi.put(`category/update/${_id}`, { categoryName });
      dispatch(updateCategory(data));
      toastSuccess('Categoría actualizada correctamente');
    } catch (error) {
      console.log(error);
      toastError('Hubo un error');
    }
  };
};
