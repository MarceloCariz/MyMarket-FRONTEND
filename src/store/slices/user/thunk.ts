import mymarketApi from "../../../api/mymarketApi";
import { toastError, toastSuccess } from "../../../components";
import { UserProfileI } from "../../../interfaces/user";
import { AppDispatch, RootState } from "../../store";
import { setUserProfile } from "./userSlice";



export const updateProfileUser = (values: UserProfileI) => {
    return async(dispatch:AppDispatch, getState: ()=>RootState)=>{
        try {
            const {lastName, name, address, profileImg, latitude, longitude} = values;
            const formData = new FormData();
            if(latitude && longitude && address){
                formData.append("latitude", latitude.toString());
                formData.append("longitude", longitude.toString());
                formData.append("address", address);
            }
            formData.append("name", name);
            formData.append("lastName",lastName);


            const {data} = await mymarketApi.put("user/update/profile", formData);
            dispatch(setUserProfile({profile:data}));
            toastSuccess("Perfil actualizado correctamente");
        } catch (error) {
            console.log(error)
            toastError("Hubo un error")
        }
    }
}

export const getProfileUser = () => {
    return async(dispatch:AppDispatch, getState: ()=>RootState)=>{ 
        try {

            const {user} = getState().auth;
            if(!user) return;

            const {data} = await mymarketApi("user/profile/");

            dispatch(setUserProfile({profile:data}))
        } catch (error) {
            console.log(error);
        }
    }
}