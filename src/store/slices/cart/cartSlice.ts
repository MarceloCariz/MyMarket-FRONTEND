import { createSlice } from "@reduxjs/toolkit"
import { ProductI } from "../../../interfaces"


interface cartState {
    cart: ProductI[],
}


const initialState:cartState = {
    cart: []
}





export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        setCart: (state, action) => {
            state.cart = action.payload.cart;
            return state;
        },
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.product];
            localStorage.setItem("cart", JSON.stringify(state.cart));
            return state;
        }
    }
});


export const {
    setCart,
    addToCart
} = cartSlice.actions;