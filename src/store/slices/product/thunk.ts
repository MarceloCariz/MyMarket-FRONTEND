import { FormikHelpers, FormikState } from "formik";
import mymarketApi from "../../../api/mymarketApi";
import { toastError, toastSuccess } from "../../../components";
import { ProductI } from "../../../interfaces";
import { AppDispatch, RootState } from "../../store";
import { addProduct, removeProduct, setProducts, startLoading, startLoadingProducts, toogleModalProductActions, updateProduct } from "./productSlice";


export const getProducts = () => {
    return async(dispatch:AppDispatch)=>{ 
        try {
            dispatch(startLoadingProducts());
            
            const {data} = await mymarketApi('product/all');

            dispatch(setProducts({products: data}));
        } catch (error) {
            console.log(error);
        }
    }
}

export const getProductByShop = () => {
    return async(dispatch:AppDispatch, getState:()=> RootState)=>{ 
        try {
            const {user} = getState().auth;
            
            const {data} = await mymarketApi(`product/shop/${user?.uid}`);
            dispatch(setProducts({products: data}));
        } catch (error) {
            console.log(error);
        }
    }
}

export const getProductByShopUSer = (shopId: string) => {
    return async(dispatch:AppDispatch)=>{ 
        try {
            dispatch(startLoadingProducts());
            const {data} = await mymarketApi(`product/shop/${shopId}`);

            const products = data.map((p:ProductI) => ({...p, shopName: p.shop.shopName}))

            dispatch(setProducts({products}));

        } catch (error) {
            console.log(error);
        }
    }
}



export const createProduct = (values:ProductI, file:File, resetForm: (nextState?: Partial<FormikState<ProductI>> | undefined) => void) => {
    return async(dispatch:AppDispatch, getState:()=> RootState)=>{ 
        try {
            const {user} = getState().auth;

            const product:ProductI = values;
            
            const formData = new FormData();
            if(!user?.uid) return;

            formData.append("title", product.title);
            formData.append("description", product.description);
            formData.append("price", product.price.toString());
            formData.append("stock", product.stock.toString());
            formData.append("shop", user?.uid);
            formData.append("image", file)

            dispatch(startLoading());
            const {data} = await mymarketApi.post('product/create', formData);
            dispatch(addProduct({product: data}));
            toastSuccess("Producto agregado correctamente");
            resetForm();

        } catch (error) {
            console.log(error)
            toastError("Hubo un error");

        }
    }
    
}

export const putProduct = (values:ProductI, file?:File) => {
    return async(dispatch:AppDispatch, getState:()=> RootState)=>{ 
        try {
            const {user} = getState().auth;
            const product:ProductI = values;

            const formData = new FormData();
            if(!user?.uid) return;
            formData.append("title", product.title);
            formData.append("description", product.description);
            formData.append("price", product.price.toString());
            formData.append("stock", product.stock.toString());
            // formData.append("shop", user?.uid);
            if(file){
                formData.append("image", file)
            }

            dispatch(startLoading());
            const {data} = await mymarketApi.put(`product/update/${product._id}`, formData);
            dispatch(updateProduct({product: data}));
            dispatch(toogleModalProductActions({type:''}));
            toastSuccess("Producto actualizado correctamente");

        } catch (error) {
            console.log(error)
            toastError("Hubo un error");

        }
    }
    
}




export const deleteProduct = () => {
    return async(dispatch:AppDispatch, getState:()=> RootState)=>{ 
        try {
            
            const {activeProduct} = getState().product;

            const {data} = await mymarketApi.delete(`product/delete/${activeProduct?._id}`);
            console.log(data)
            toastSuccess(data.message);
            dispatch(removeProduct({id: activeProduct?._id}));

        } catch (error) {
            console.log(error)
        }
    }
}