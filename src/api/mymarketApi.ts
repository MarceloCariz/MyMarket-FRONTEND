import axios from "axios";


const mymarketApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

mymarketApi.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');

        if(token){
            config.headers.Authorization = `Beater ${token}`;
        }
        return config
    }, (error) => {
        return Promise.reject(error);
    }
);

export default mymarketApi;