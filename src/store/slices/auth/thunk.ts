import { AxiosError } from "axios";
import mymarketApi from "../../../api/mymarketApi";
import { toastError } from "../../../components/ui";
import { AuthI, LoginI } from "../../../interfaces/auth";
import { logout, setError, setUser, startLogin } from "./authSlice";
import { useNavigate } from "react-router-dom";



export const SignIn = ({email, password}:LoginI) => {
    return async(dispatch:any, getState:any)=>{
        try {
            const response = await mymarketApi.post('/auth/login', {email, password});
            
            if(response.status === 401){
                return toastError("Correo o contraseña incorrectos");
            }

            

            if(!response.data){
                return toastError("Hubo un error");
            }
            const localStorageToken = response.data.token || "";
            
            localStorage.setItem("token", localStorageToken);

            dispatch(startLogin(localStorageToken));
            dispatch(getUserByToken())
        } catch (error : any) {
            console.log(error)
            if(error.response.status === 401){
                dispatch(setError("Correo o contraseña incorrectos, por favor intentelo nuevamente"))
                return toastError("Correo o contraseña incorrectos, por favor intentelo nuevamente");
            }
        }
    }
}


export const getUserByToken = () => {
    return async(dispatch:any, getState:any)=>{
        

        let token = localStorage.getItem("token");
        // let token = getState.auth.token;
        if(!token) return;

        const headers = {
            Authorization: `Bearer ${token}`,
        }
        try{
            const {data} = await mymarketApi("/auth/revalidate", {headers});

            const user: AuthI = {
                uid: data.uid,
                roles: data.roles,
                username: data.username,
                token: data.token,
            }
            localStorage.setItem("token", data.token);
            dispatch(setUser({user, token: data.token}))
        }catch(error){
            const err = error as AxiosError;
            if(err.response?.status === 400 || err.response?.status === 403){
                dispatch(logout());
            }
        }

    }
}

// Cuales son los estados de git *
// Para que sirven los tags *
// Que son los hooks * .git  
// que es el gitignore *
//silencios *


// cual es el proceso completo de git 
// como fusiono ramas  // 
// Como elimino una rama  // git branch -D nombre rama framciscat / amylovelace
// que es el git rebase  // 
// 


