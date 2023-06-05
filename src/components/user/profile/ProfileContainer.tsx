import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material'
import { CenterColumn, ContainerCenter } from '../../../styles/styles'


export interface Props {
    children: JSX.Element
}

export const ProfileContainer = ({children}:Props) => {
    return (
        <ContainerCenter  width={{sm:"60%"}}  boxShadow={6} borderRadius={2}>

            <List 
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Opciones de Perfil
                    </ListSubheader>
                }
            >
                <CenterColumn >
                    <ListItemButton sx={{display:"flex", flexDirection:"column", gap: '5px'}} >
                        <Avatar />
                        <Typography color={"primary"}>Editar</Typography>
                    </ListItemButton>
                    <ListItemText primary="Datos personales"/>

                </CenterColumn>
            </List>
            <ContainerCenter borderLeft={"1px gray solid"}  alignItems={"center"} padding={2}>
                {children}
            </ContainerCenter>
        </ContainerCenter>
    )
}
