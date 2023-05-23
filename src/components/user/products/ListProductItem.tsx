import { Box, Card, CardContent, CardHeader, IconButton, Tooltip, Typography, Button, CardMedia } from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { ProductI } from "../../../interfaces"
import { AddToCartButton } from "./AddToCartButton";
import { useNavigate, useParams } from "react-router-dom";


interface Props {
    product : ProductI
}

export const ListProductItem = ({product}:Props) => {

    const {title,price, stock,  shopName, imgUrl, shopId, categoryName} = product;
    const navigate = useNavigate();

    const {shopId:params} = useParams();

    return (
        <Box width={"100%"} boxShadow={5} borderRadius={5}>
            <Card>

                <CardHeader   sx={{backgroundColor:'rgb(50, 77, 112)', color: 'white', display: params ? "none" : "flex" }} 
                    title={shopName}
                    action={<IconButton onClick={() => navigate(`/home/shop/${shopId}`)} sx={{pb:1}}>
                                <Tooltip title="Ir a la tienda">
                                    <StorefrontIcon htmlColor="white"/>
                                </Tooltip>
                            </IconButton>
                    }
                />
                <CardMedia sx={{objectFit:'contain'}} component={"img"} height={"194"} image={imgUrl} alt={`image-${title}`} />
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

                        <Typography variant="h5">Categoría: 
                                <Typography color={"gray"} textTransform={"capitalize"} variant='h5' component={"span"}> {categoryName} </Typography>
                        </Typography>

                    </Box>
                    <Box marginTop={2} display={"flex"} justifyContent={"center"}>
                        <AddToCartButton product={product} />
                    </Box>

                </CardContent>
            </Card>
        </Box>
    )
}
