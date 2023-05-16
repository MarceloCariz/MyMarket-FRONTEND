import { Box, Card, CardContent, CardHeader, IconButton, Tooltip, Typography, Button, CardMedia } from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { ProductI } from "../../../interfaces"


interface Props {
    product : ProductI
}

export const ListProductItem = ({product}:Props) => {

    const {title,description,price, stock, shopId, shopName, imgUrl} = product;

    return (
        <Box width={"100%"}>
            <Card>
                <CardHeader  sx={{backgroundColor:'rgb(50, 77, 112)', color: 'white'}} 
                    title={shopName}
                    action={<IconButton sx={{pb:1}}>
                                <Tooltip title="Ir a la tienda">
                                    <StorefrontIcon htmlColor="white"/>
                                </Tooltip>
                            </IconButton>
                    }
                />
                <CardMedia component={"img"} height={"194"} image={imgUrl} alt={`image-${title}`} />
                <CardContent >
                    <Box display={"flex"} flexDirection={"column"} gap={1}>
                        <Typography variant="h5">Nombre: 
                            <Typography color={"gray"} textTransform={"capitalize"} variant='h5' component={"span"}> {title}</Typography>
                        </Typography>
                        <Typography variant="h5">Cantidad disponible: 
                            <Typography color={"gray"} textTransform={"capitalize"} variant='h5' component={"span"}> {stock}</Typography>
                        </Typography>
                        <Typography variant="h5">Precio: 
                            <Typography color={"gray"} textTransform={"capitalize"} variant='h5' component={"span"}> {price.toLocaleString("es-CL",{style: 'currency',currency: "clp"})} </Typography>
                        </Typography>
                    </Box>
                    <Box marginTop={2} display={"flex"} justifyContent={"center"}>
                        <Button variant="contained" color="success">
                            Agregar al carrito
                        </Button>
                    </Box>

                </CardContent>
            </Card>
        </Box>
    )
}
