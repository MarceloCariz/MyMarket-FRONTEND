import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { productSlice, productState } from "./product/productSlice";
import { cartSlice } from "./cart";
import { uiSlice } from "./ui";
import { UserState } from "./auth/authSlice";
import { cartState } from "./cart/cartSlice";
import {UiState} from './ui/uiSlice'
import { userSlice, userStateI } from "./user/userSlice";

interface RootState {
    auth: UserState,
    user: userStateI,
    product: productState,
    cart: cartState,
    ui: UiState
}

const appReducer = combineReducers({
    auth: authSlice.reducer,
    user: userSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer
})

const rootReducer = (state :  CombinedState<RootState> | undefined ,  action:AnyAction) => {
    if (action.type === 'auth/logout') {
        return appReducer(undefined, action)
    }
    
    return appReducer(state, action)
}

export default rootReducer;


/// Problema de que no limpiaba todo el store de redux al hacer logout
/// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store