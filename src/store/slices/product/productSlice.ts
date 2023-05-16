import {createSlice} from '@reduxjs/toolkit'
import { ProductI } from '../../../interfaces'

export interface productState {
    products: ProductI[];
}


const initialState : productState  = {
    products: [],
}   

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        setProducts: (state, action) => {
            state.products = action.payload.products;
        }
    }
});


export const {
    setProducts
} = productSlice.actions;