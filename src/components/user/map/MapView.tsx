import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { getUserLocation } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setMap, setMarker, setUserLocation } from '@/store';
import { CenterColumn } from '@/styles';
import { SearchInput } from '@/components';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

export const MapView = () => {
  const dispatch = useAppDispatch();
  const { isLoadingLocation, userLocation } = useAppSelector((state) => state.map);
  const { profile } = useAppSelector((state) => state.user);

  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profile) {
      const lnglat = [profile.longitude, profile.latitude];
      dispatch(setUserLocation(lnglat));
      return;
    }
    getUserLocation().then((lnglat) => dispatch(setUserLocation(lnglat)));
  }, [dispatch, profile]);

  useEffect(() => {
    if (!isLoadingLocation) {
      const map = new mapboxgl.Map({
        container: mapDiv.current!, // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 15, // starting zoom
      });
      const myLocationPopup = new Popup();

      const marker = new Marker({ color: '#61DAFB' })
        .setLngLat(map.getCenter())
        .setPopup(myLocationPopup)
        .addTo(map);
      dispatch(setMap(map));
      dispatch(setMarker(marker));
    }
  }, [dispatch, isLoadingLocation, userLocation]);

  return (
    <CenterColumn>
      <SearchInput />
      <div
        ref={mapDiv}
        style={{
          height: '300px',
          width: '600px',
        }}
      ></div>
    </CenterColumn>
  );
};
