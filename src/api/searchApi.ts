

import axios from 'axios';



// https://api.mapbox.com/geocoding/v5/mapbox.places/la%20flori.json?limit=5&proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=YOUR_MAPBOX_ACCESS_TOKEN
const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: import.meta.env.VITE_MAPBOX_TOKEN
    }
})


export default searchApi;