import {configureStore} from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';
import { uiSlice } from './slices/ui';
import { productSlice } from './slices/product/productSlice';
import { cartSlice } from './slices/cart';


export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        product: productSlice.reducer,
        cart: cartSlice.reducer,
        ui: uiSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
