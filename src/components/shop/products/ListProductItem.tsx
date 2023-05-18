import { Box, Card, CardContent,  Typography, Button, CardMedia } from "@mui/material";
import { ProductI } from "../../../interfaces"
import { DeleteButton, UpdateButton } from "./ActionButtons";
import { useAppDispatch } from "../../../hooks";
import { setActiveProduct } from "../../../store/slices/product/productSlice";


interface Props {
    product : ProductI
}

export const ListProductItem = ({product}:Props) => {

    const dispacth = useAppDispatch();
    const {title,price, stock,  imgUrl} = product;


    return (
        <Box component={"div"} onMouseEnter={() => dispacth(setActiveProduct({product}))}
            width={"100%"}   boxShadow={10} borderRadius={4}>
            <Card>
                <CardMedia sx={{objectFit:'contain'}} component={"img"} height={"194"}  image={imgUrl} alt={`image-${title}`} />
                <CardContent >
                    <Box display={"flex"}  flexDirection={"column"} gap={1} >
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
                    <Box marginTop={2}  display={"flex"} gap={2} justifyContent={"center"}>
                        <UpdateButton/>
                        <DeleteButton/>
                    </Box>

                </CardContent>
            </Card>
        </Box>
    )
}
