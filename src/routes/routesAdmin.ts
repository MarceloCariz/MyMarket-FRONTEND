
import { Category, DashBoard } from "../pages/admin";
import { RoutesI } from "./routesUsers";




export const routesAdmin: RoutesI[] = [
    {
        path: '',
        to: '',
        Component: DashBoard,
        name: 'DashBoard',
        index: true
    },
    {
        path: 'category',
        to: 'category',
        Component: Category,
        name: 'Category',
    },
    // {
    //     path: 'products',
    //     to: 'products',
    //     Component: Products,
    //     name: 'products',
    // }

]