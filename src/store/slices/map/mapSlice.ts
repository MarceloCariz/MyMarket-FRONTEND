import { createSlice } from "@reduxjs/toolkit";
import {Map, Marker} from 'mapbox-gl';
import { Feature } from "../../../interfaces";

export interface MapStateI {
    isMapReady: boolean;
    mapView?: Map;
    isLoadingLocation: boolean;
    userLocation?: [number, number];
    userAddress: string;
    isLoadingPlaces: boolean;
    places: Feature[];
    marker: Marker | null;
    isModalMapOpen: boolean;
}

const initialState:MapStateI = {
    isMapReady: false,
    isLoadingLocation: true,
    isLoadingPlaces: false,
    isModalMapOpen: false,
    userAddress: '',
    places: [],
    marker: null
}


export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers:{
        setUserLocation: (state, action) => {
            state.userLocation = action.payload
            state.isLoadingLocation = false;
            return state;
        },
        setUserAddress: (state, action) => {
            state.userAddress = action.payload;
            return state;
        },
        setMarker: (state, action) => {
            state.marker?.remove();
            state.marker = action.payload;
            return state;
        },
        startLoadingMap: (state, action) => {
            state.isMapReady = true;
            return state;
        },
        setMap: (state, action) => {
            state.mapView = action.payload;
            state.isMapReady = false;
            return state;
        },
        startLoadingPlaces: (state) => {
            state.isLoadingPlaces = true;
            return state;
        },
        setPlaces: (state, action) => {
            state.places = action.payload;
            state.isLoadingPlaces = false;
            return state;
        },
        toogleModalMap: (state) => {
            state.isModalMapOpen = !state.isModalMapOpen;
            return state;
        }
    }
})


export const {
    setUserLocation,
    setMap,
    setUserAddress,
    setPlaces,
    setMarker,
    toogleModalMap,
    startLoadingMap,
    startLoadingPlaces
} = mapSlice.actions;