import { Box, Button,  Divider,  Typography } from "@mui/material";
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Feature } from "../../../interfaces";
import { setMarker, setPlaces, setUserAddress, setUserLocation } from "../../../store/slices/map";
import { Marker, Popup } from "mapbox-gl";
import { CenterColumn } from "../../../styles/styles";



export const SearchResults = () => {

    const {places, isLoadingPlaces, mapView} = useAppSelector(state => state.map);
    const dispatch = useAppDispatch();


    const onPlaceClicked = (place: Feature) =>{
        const [lng, lat] = place.center;
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
        <ContainerResults className="scrollBar"   boxShadow={2} borderRadius={4} >
            {
            places.map( place => (
                <CenterColumn marginBottom={2} alignItems={"start"} gap={2}  onClick={() => onPlaceClicked(place)} key={place.id} >
                    <Box width={"100%"}>
                        <Typography>{place.text_es}</Typography>
                        <Typography >
                            {place.place_name_es}
                        </Typography>
                        <Button  variant="contained" size="small">Ir a la dirección</Button>
                        <Divider/>
                    </Box>
                </CenterColumn>
            ))
            }
        </ContainerResults>
    )
}



const ContainerResults = styled(Box)`
    position: absolute;
    height: 200px;
    width: 500px;
    overflow: scroll;
    z-index: 2;
    background-color: white;
    margin-top: 3rem;
    padding: 10px;
    border-radius: 4;
`