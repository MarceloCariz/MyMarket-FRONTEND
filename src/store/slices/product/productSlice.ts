import {createSlice} from '@reduxjs/toolkit'
import { ProductI } from '../../../interfaces'

export interface productState {
    products: ProductI[];
    activeProduct: ProductI | null;
    isOpenModalProductActions:{active: boolean, type: "add" | "edit" | ''};
}


const initialState : productState  = {
    products: [],
    activeProduct: null,
    isOpenModalProductActions: {active: false, type: ''},
}   

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        setProducts: (state, action) => {
            state.products = action.payload.products;
            return state;
        },
        setActiveProduct: (state, action) => {
            state.activeProduct = action.payload.product;
            return state;
        },
        toogleModalProductActions: (state, action) => {
            state.isOpenModalProductActions.active = !state.isOpenModalProductActions.active;
            state.isOpenModalProductActions.type = action.payload.type;
            return state; 
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((p) => p._id !== action.payload.id);
            state.activeProduct = null;
            return state;
        },


    }
});


export const {
    setProducts,
    setActiveProduct,
    toogleModalProductActions,
    //Functions
    removeProduct
} = productSlice.actions;