import { Box, Button, Input } from '@mui/material'
import { Feature, PlacesReponse } from '../../../interfaces/map'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setPlaces, startLoadingPlaces } from '../../../store/slices/map';
import { searchApi } from '../../../api';
import { ChangeEvent, useRef } from 'react';
import { SearchResults } from '.';

export const SearchInput = () => {

    const dispatch = useAppDispatch();
    const {userLocation, isLoadingPlaces, userAddress} = useAppSelector(state => state.map);


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
        console.log(userAddress)
        console.log(userLocation)
    }

    return (
        <>  
            <Box marginBottom={2}>
                <Input  onChange={onQueryChanged} placeholder='fsdasdasdasd' />
                <Button onClick={handleSaveLocation}  variant='contained'>Guardar</Button>
            </Box>
            {
                !isLoadingPlaces && (
                    <SearchResults/>
                )
            }
        </>
    )
}
