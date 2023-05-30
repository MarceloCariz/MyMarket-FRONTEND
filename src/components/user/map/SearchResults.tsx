import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Feature } from "../../../interfaces";
import { Box, Button, Typography } from "@mui/material";
import { setMarker, setPlaces, setUserAddress, setUserLocation } from "../../../store/slices/map";
import { Marker, Popup } from "mapbox-gl";



export const SearchResults = () => {

    const {places, isLoadingPlaces, userLocation, mapView} = useAppSelector(state => state.map);
    const dispatch = useAppDispatch();
    const [activePlaceId, setActivePlaceId] = useState('')


    const onPlaceClicked = (place: Feature) =>{
        const [lng, lat] = place.center;
        setActivePlaceId(place.id);
        if(!mapView) return;

        mapView.flyTo({
            zoom: 16,
            center: [lng, lat]
        })

        const myLocationPopup = new Popup()

        const marker = new Marker({color: '#61DAFB'})
            .setLngLat([lng, lat])
            .setPopup(myLocationPopup)
            .addTo(mapView);

        dispatch(setPlaces([]));
        dispatch(setMarker(marker));
        dispatch(setUserLocation(place.center));
        dispatch(setUserAddress(place.place_name_es));
    }



    if(isLoadingPlaces) return (<div><h6>Buscando</h6><p>Espere por favor...</p></div>);

    if(places.length === 0) return <></>;

    return (
        <Box  position={"absolute"} height={"300px"} overflow={"scroll"} zIndex={2} sx={{backgroundColor: 'white'}} marginTop={2} className="list-group mt-3">
            {
            places.map( place => (
                <Box  onClick={() => onPlaceClicked(place)} key={place.id}>
                    <Typography>{place.text_es}</Typography>
                    <Typography >
                        {place.place_name_es}
                    </Typography>
                    <Button variant="contained" >Seleccionar</Button>
                </Box>
            ))
            }

        </Box>
    )
}