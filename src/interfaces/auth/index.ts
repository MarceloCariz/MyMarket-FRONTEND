import { RolesEnum } from "../../enums";

export interface AuthI {
    uid: string;
    username: string;
    roles: RolesEnum[];
    token: string;
}

export interface LoginI {
    email: string;
    password: string;
}