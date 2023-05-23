import {useState} from 'react';
import { IconButton, Input, InputAdornment } from '@mui/material';
import {  ClearOutlined, SearchOutlined} from '@mui/icons-material';
import {  Theme } from '@mui/material/styles';
import { styled } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { searchProduct } from '../../../store/slices/product/thunk';
import { useNavigate } from 'react-router-dom';
import { toogleSearch } from '../../../store/slices/ui/uiSlice';


export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useAppDispatch();
    const {isOpenSearch} = useAppSelector(state => state.ui);
    const navigate = useNavigate();



    const handleOnSearchTerm = () => {
        if(searchTerm.trim().length === 0) return;
        // dispatch(searchProduct(searchTerm));
        navigate(`search?q=${searchTerm}`)

    }

    /// responsive
    const handleShowSearch = () => {
        dispatch(toogleSearch());
    }

    return (
        <>
            <SearchField
                autoFocus
                sx={{display:{xs: isOpenSearch ? "flex" :'none', md: 'flex'}}}
                type='search'
                onKeyUp={(e) => e.key === 'Enter' ? handleOnSearchTerm() : null}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className='fadeIn'
                disableUnderline={true}
            />
            {
                isOpenSearch && (
                        <IconButton
                            sx={{margin:0, padding: 0}}
                            onClick={handleShowSearch}
                        >
                            <ClearOutlined htmlColor='white' sx={{fontSize: 32}}/>
                        </IconButton>
                )
            }
            <IconButton sx={{display:{xs: isOpenSearch ? "none" : "flex", md:"none"}}} onClick={handleShowSearch}>
                <SearchOutlined htmlColor='white'  sx={{fontSize: 32}}/>
            </IconButton>
        </>
    )
}


const SearchField = styled(Input)`
    background-color: white;
    border-radius: 0.5rem;
    flex-grow: 10;
    padding: 10px;
    height: 3rem;
`;