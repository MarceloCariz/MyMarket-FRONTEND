import {createSlice} from '@reduxjs/toolkit';

export interface UiState{
    isOpenDrawer: boolean;
    isOpenSearch: boolean;
}


const initialState:UiState = {
    isOpenDrawer: false,
    isOpenSearch: false,
}



export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers:{
        toogleDrawer: (state) => {
            state.isOpenDrawer = !state.isOpenDrawer;
            return state;
        },
        toogleSearch: (state) => {
            state.isOpenSearch = !state.isOpenSearch;
            return state;
        } 
    }
})

export const {
    toogleDrawer,
    toogleSearch
} = uiSlice.actions;