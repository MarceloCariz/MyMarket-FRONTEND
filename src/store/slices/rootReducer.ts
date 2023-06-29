import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import {
  authSlice,
  AdminState,
  adminSlice,
  MapStateI,
  mapSlice,
  userSlice,
  userStateI,
  UiState,
  cartState,
  UserState,
  uiSlice,
  cartSlice,
  productSlice,
  productState,
} from '@/store';

interface RootState {
  admin: AdminState;
  auth: UserState;
  user: userStateI;
  product: productState;
  cart: cartState;
  map: MapStateI;
  ui: UiState;
}

const appReducer = combineReducers({
  admin: adminSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  product: productSlice.reducer,
  cart: cartSlice.reducer,
  map: mapSlice.reducer,
  ui: uiSlice.reducer,
});

const rootReducer = (state: CombinedState<RootState> | undefined, action: AnyAction) => {
  if (action.type === 'auth/logout') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;

/// Problema de que no limpiaba todo el store de redux al hacer logout
/// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
