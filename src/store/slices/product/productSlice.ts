import {createSlice} from '@reduxjs/toolkit'
import { CategoryI, ProductI } from '../../../interfaces'
import { ActionModalProductsEnum } from '../../../enums';

export interface productState {
    products: ProductI[];
    categories: CategoryI[];
    activeProduct: ProductI | null;
    isOpenModalProductActions:{active: boolean, type: ActionModalProductsEnum};
    loadingAction: boolean;
    loadingProducts: boolean;
}


const initialState : productState  = {
    products: [],
    categories: [],
    activeProduct: null,
    isOpenModalProductActions: {active: false, type: ActionModalProductsEnum.NONE},
    loadingAction: false,
    loadingProducts: false,
}   

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        setProducts: (state, action) => {
            state.products = action.payload.products;
            state.loadingProducts = false;
            return state;
        },
        setCategories: (state, action) => {
            state.categories = action.payload.categories;
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
        startLoading: (state) => {
            state.loadingAction = true;
            return state;
        },
        startLoadingProducts: (state) => {
            state.loadingProducts = true;
            return state;
        },
        addProduct: (state, action) => {
            state.products = [...state.products, action.payload.product];
            state.loadingAction = false;
            state.activeProduct = null;
            return state;
        },
        updateProduct:(state, action) => {
            state.products = state.products.map((p) => {
                if(p._id === action.payload.product._id){
                    p = action.payload.product;
                    return p;
                }   
                return p;
            });
            state.loadingAction = false;
            state.activeProduct = null;
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
    setCategories,
    setActiveProduct,
    startLoading,
    startLoadingProducts,
    //Functions
    toogleModalProductActions,
    addProduct,
    updateProduct,
    removeProduct

} = productSlice.actions;