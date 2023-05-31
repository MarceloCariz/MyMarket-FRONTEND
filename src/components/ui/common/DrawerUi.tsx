import { Drawer , Box, Typography} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toogleDrawer } from '../../../store/slices/ui/uiSlice';
import { DrawerOptionsUser, LogoutButton } from './drawerOptions';
import { RolesEnum } from '../../../enums';



export const DrawerUi = () => {

    const {isOpenDrawer} = useAppSelector(state => state.ui);
    const {user} = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();

    const role = user?.roles;
    return (
        <Drawer
            anchor={"right"}
            open={isOpenDrawer}
            onClose={()=>dispatch(toogleDrawer())}
        >
            <Box sx={{ marginTop: "1rem"}} paddingX={8} >
                <Typography marginBottom={2} component={"h2"} fontSize={32} textAlign="center" fontWeight={"semibold"}>Menú</Typography>
                {
                    role?.includes(RolesEnum.USER) && (
                        <DrawerOptionsUser/>
                    )
                }

                <Box display={"flex"}   height={"70vh"}>
                    <Box display={"flex"} alignItems={"flex-end"}>
                        <LogoutButton/>
                    </Box>
                </Box>

            </Box>
        </Drawer>
    )
}
