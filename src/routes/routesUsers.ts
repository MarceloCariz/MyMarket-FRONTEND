import { LazyExoticComponent } from "react";
import {Home, Profile, ShopPage} from "../pages/user/";


type JSXComponent = () =>  JSX.Element;

export interface RoutesI {
    to: string;
    path: string;
    Component: LazyExoticComponent<JSXComponent> | JSXComponent;
    name: string;
    index?: boolean;
}


export const routesUsers: RoutesI[] = [
    {
        path: '',
        to: '',
        Component: Home,
        name: 'Home',
        index: true,
    },
    {
        path: 'profile',
        to: 'profile',
        Component: Profile,
        name: 'Profile',
    },
    {
        path: 'shop/:shopId',
        to: '',
        Component: ShopPage,
        name: "ShopPage"
    }

]