import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import { useEffect, useRef } from 'react'
import { getUserLocation } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setMap, setMarker, setUserLocation } from '../../../store/slices/map';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CenterColumn } from '../../../styles/styles';
import { Input } from '@mui/material';
import { SearchInput } from '.';


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

export const MapView = () => {

    const dispatch = useAppDispatch();
    const {isLoadingLocation, userLocation} = useAppSelector(state => state.map);

    const mapDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getUserLocation().then(lnglat => (
            dispatch(setUserLocation(lnglat))
        ))
    },[])

    useEffect(()=>{
        console.log(userLocation)
        if(!isLoadingLocation){
            const map = new mapboxgl.Map({
                container: mapDiv.current!, // container ID
                style: 'mapbox://styles/mapbox/dark-v10', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 12 // starting zoom
            });
            const myLocationPopup = new Popup()

            const marker =new Marker({color: '#61DAFB'})
                .setLngLat(map.getCenter())
                .setPopup(myLocationPopup)
                .addTo(map);
            dispatch(setMap(map));
            dispatch(setMarker(marker));
        }
    },[isLoadingLocation])

    return (
        <CenterColumn>
            <SearchInput/>
            <div ref={mapDiv}
                style={{
                    height: '400px',
                    left: 0,
                    top: 0,
                    width: '700px',
                }}
            >
            </div>
        </CenterColumn>

    )
}
