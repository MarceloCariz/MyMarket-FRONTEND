import Login from "../pages/Login";
import { RoutesI } from "./routesUsers";



export const routesNoAuthorization: RoutesI[] = [
    {
        path: '/',
        to: '/',
        Component: Login,
        name: 'Login'
    }
]