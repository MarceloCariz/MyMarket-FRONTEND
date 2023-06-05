import { Box } from "@mui/material"
import { ModalMap, ProfileContainer, ProfileForm } from "../../components"
import { CenterColumn } from "../../styles/styles"



const Profile = () => {

    return (
        <Box>
            <ModalMap/>
            <CenterColumn>
                <ProfileContainer>
                    <ProfileForm/>
                </ProfileContainer>
            </CenterColumn>

        </Box>
    )
}

export default Profile