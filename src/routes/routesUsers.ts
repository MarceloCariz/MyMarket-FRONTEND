import { LazyExoticComponent } from "react";
import {Home} from "../pages/user/";


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

]