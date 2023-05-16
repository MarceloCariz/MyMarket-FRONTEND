import {createSlice} from '@reduxjs/toolkit';

export interface UiState{
    isOpenDrawer: boolean;
}


const initialState:UiState = {
    isOpenDrawer: false,
}



export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers:{
        toogleDrawer: (state) => {
            state.isOpenDrawer = !state.isOpenDrawer;
            return state;
        }
    }
})

export const {
    toogleDrawer
} = uiSlice.actions;