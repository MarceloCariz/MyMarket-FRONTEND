import { createSlice } from '@reduxjs/toolkit';
import { AuthI } from '../../../interfaces/auth';

export interface UserState {
  user: AuthI | null;
  token: string;
  error: string;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  token: '',
  error: '',
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLogin: (state, action) => {
      state.token = action.payload;
      state.loading = true;
      return state;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      return state;
    },
    logout: (state) => {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('cart');
      return state;
    },
    setError: (state, action) => {
      state.error = action.payload;
      return state;
    },
  },
});

export const { startLogin, setUser, logout, setError } = authSlice.actions;
