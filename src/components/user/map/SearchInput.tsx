import { Box, Button, Input } from '@mui/material'
import { Feature, PlacesReponse } from '../../../interfaces/map'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setPlaces, startLoadingPlaces } from '../../../store/slices/map';
import { searchApi } from '../../../api';
import { ChangeEvent, useRef } from 'react';
import { SearchResults } from '.';
import { updateProfileUser } from '../../../store/slices/user/thunk';
import { UserProfileI } from '../../../interfaces/user';
import { userStateI } from '../../../store/slices/user/userSlice';

export const SearchInput = () => {

    const dispatch = useAppDispatch();
    const {userLocation, isLoadingPlaces, userAddress} = useAppSelector(state => state.map);
    const {profile} = useAppSelector(state => state.user);



    const searchPlacesByTerm = async(query:string):Promise<Feature[]> => {
        if(query.length === 0){
            dispatch(setPlaces([]));
            return[];
        };

        dispatch(startLoadingPlaces());

        const resp = await searchApi<PlacesReponse>(`/${query}.json`,{
            params:{
                proximity: userLocation?.join(',')
            }
        });
        dispatch(setPlaces(resp.data.features));
        return resp.data.features;
    }


    const debounceRef = useRef<any>();

    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) =>{

        if(debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value)
        }, 350);
    }

    const handleSaveLocation = () => {

        const newData:UserProfileI = {
            name: profile?.name || "",
            lastName: profile?.lastName || "",
            address: userAddress,
            longitude: userLocation?.[0] || 0,
            latitude: userLocation?.[1] || 0,
        }
        console.log(newData);
        dispatch(updateProfileUser(newData))
    }

    return (
        <>  
            <Box marginBottom={2}>
                <Input  onChange={onQueryChanged} placeholder='Ingrese una dirección' />
                <Button sx={{ml:2}}  onClick={handleSaveLocation}  variant='contained'>Guardar</Button>
            </Box>
            {
                !isLoadingPlaces && (
                    <SearchResults/>
                )
            }
        </>
    )
}
