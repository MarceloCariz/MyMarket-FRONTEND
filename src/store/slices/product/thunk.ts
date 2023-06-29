import { FormikState } from 'formik';
import mymarketApi from '../../../api/mymarketApi';
import { toastError, toastSuccess } from '../../../components';
import { ProductI } from '../../../interfaces';
import { AppDispatch, RootState } from '../../store';
import {
  addProduct,
  removeProduct,
  setCategories,
  setProducts,
  startLoading,
  startLoadingProducts,
  toogleModalProductActions,
  updateProduct,
} from './productSlice';

export const getProducts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(startLoadingProducts());

      const { data } = await mymarketApi('product/all');

      dispatch(setProducts({ products: data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCategories = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await mymarketApi('category');

      dispatch(setCategories({ categories: data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByShop = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { user } = getState().auth;

      const { data } = await mymarketApi(`product/shop/${user?.uid}`);
      dispatch(setProducts({ products: data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductByShopUSer = (shopId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(startLoadingProducts());
      const { data } = await mymarketApi(`product/shop/${shopId}`);

      dispatch(setProducts({ products: data }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProduct = (
  values: ProductI,
  file: File,
  resetForm: (nextState?: Partial<FormikState<ProductI>> | undefined) => void,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { user } = getState().auth;

      const { title, description, price, stock, category } = values;

      const formData = new FormData();
      if (!user?.uid) return;

      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('stock', stock.toString());
      formData.append('shop', user?.uid);
      formData.append('category', category);
      formData.append('image', file);

      dispatch(startLoading());
      const { data } = await mymarketApi.post('product/create', formData);
      dispatch(addProduct({ product: data }));
      toastSuccess('Producto agregado correctamente');
      resetForm();
    } catch (error) {
      console.log(error);
      toastError('Hubo un error');
    }
  };
};

export const putProduct = (values: ProductI, file?: File) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { user } = getState().auth;
      const { title, description, price, stock, category, _id } = values;

      const formData = new FormData();
      if (!user?.uid) return;
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('stock', stock.toString());
      formData.append('category', category);
      if (file) {
        formData.append('image', file);
      }

      dispatch(startLoading());
      const { data } = await mymarketApi.put(`product/update/${_id}`, formData);
      dispatch(updateProduct({ product: data }));
      dispatch(toogleModalProductActions({ type: '' }));
      toastSuccess('Producto actualizado correctamente');
    } catch (error) {
      console.log(error);
      toastError('Hubo un error');
    }
  };
};

export const deleteProduct = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { activeProduct } = getState().product;

      const { data } = await mymarketApi.delete(`product/delete/${activeProduct?._id}`);
      console.log(data);
      toastSuccess(data.message);
      dispatch(removeProduct({ id: activeProduct?._id }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchProduct = (searchValue: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await mymarketApi(`product/search?q=${searchValue}`);

      dispatch(setProducts({ products: data }));
    } catch (error) {
      console.log(error);
    }
  };
};
