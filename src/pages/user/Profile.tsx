import {useEffect} from 'react'
import { Box } from "@mui/material"
import { ProfileForm } from "../../components"
import { useAppDispatch } from '../../hooks'
import { getProfileUser } from '../../store/slices/user/thunk'


const Profile = () => {
    const dispatch = useAppDispatch();


    return (
        <Box>
            <ProfileForm/>
        </Box>
    )
}

export default Profile