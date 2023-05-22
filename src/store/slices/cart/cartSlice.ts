import { createSlice } from "@reduxjs/toolkit"
import { CartItem } from "../../../interfaces"


export interface cartState {
    cart: CartItem[],
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
            let product = action.payload.product;
            const isExist = state.cart.find(({_id}) =>  _id === product._id);

            if(isExist){
                state.cart =  state.cart.map((cart) => { 
                    if(cart._id ===  product._id){
                        cart.quantity++;
                        return cart;
                    }
                    return cart
                });
                localStorage.setItem("cart", JSON.stringify(state.cart));
                return state;
            }

            state.cart = [...state.cart, product];
            localStorage.setItem("cart", JSON.stringify(state.cart));
            return state;
        },
        removeToCart: (state, action) => {
            const product = action.payload.product;
            const isExist = state.cart.find(({_id}) =>  _id === product._id);


            if(isExist && isExist.quantity === 1){
                state.cart = state.cart.filter(({_id}) =>  _id !== isExist._id);
                localStorage.setItem("cart", JSON.stringify(state.cart));
                return state;
            }

            if(isExist){
                state.cart =  state.cart.map((cart) => { 
                    if(cart._id ===  product._id){
                        cart.quantity = cart.quantity - 1;
                        return cart;
                    }
                    return cart
                });
                localStorage.setItem("cart", JSON.stringify(state.cart));
                return state;
            }


            return state;

        }
    }
});


export const {
    setCart,
    addToCart,
    removeToCart
} = cartSlice.actions;