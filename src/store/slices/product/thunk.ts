import mymarketApi from "../../../api/mymarketApi";
import { setProducts } from "./productSlice";


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