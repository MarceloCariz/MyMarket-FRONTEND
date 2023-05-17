import mymarketApi from "../../../api/mymarketApi";
import { toastSuccess } from "../../../components";
import { RootState } from "../../store";
import { removeProduct, setProducts } from "./productSlice";


export const getProducts = () => {
    return async(dispatch:any)=>{ 
        try {
            
            const {data} = await mymarketApi('product/all');

            dispatch(setProducts({products: data}));
        } catch (error) {
            console.log(error);
        }
    }
}

export const getProductByShop = () => {
    return async(dispatch:any, getState:()=> RootState)=>{ 
        try {
            const {user} = getState().auth;

            const {data} = await mymarketApi(`product/shop/${user?.uid}`);
            dispatch(setProducts({products: data}));
        } catch (error) {
            console.log(error);
        }
    }
}


export const deleteProduct = () => {
    return async(dispatch:any, getState:()=> RootState)=>{ 
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