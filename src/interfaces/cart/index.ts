import { ProductI } from "..";


export interface CartItem extends ProductI {
    quantity: number;
}