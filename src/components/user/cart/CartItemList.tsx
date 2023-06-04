import {useState, ChangeEvent, useEffect, useRef} from 'react';
import { Box, Grid, CardActionArea, CardMedia, IconButton, Input, Typography, Tooltip, Divider, Link } from "@mui/material";
import { styled } from "@mui/material/styles"; 
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ContainerCenter } from "../../../styles/styles";
import { getPriceFormatted } from "../../../utils";
import { GridCenter, OptionsTittle } from "./ListCart";
import { CartItem } from "../../../interfaces";
import { addToCart, changeQuantityProduct, deleteProduct, removeToCart } from '../../../store/slices/cart/cartSlice';
import { useAppDispatch } from '../../../hooks';
import { toastError } from '../..';

interface Props {
    product : CartItem;
}

export const CartItemList = ({product}:Props) => {

    const {_id, title, imgUrl, quantity, price}  = product;

    const [quantityCart, setQuantityCart] = useState('');

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        console.log(quantity);
        setQuantityCart(quantity.toString())
    }, [quantity])
    
    const dispatch = useAppDispatch();
    
    const HandleAddProduct = () => {
        dispatch(addToCart({product}))
    }

    const HandleRemoveProduct = () => {
        dispatch(removeToCart({product}))
    }

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(_id));
    }

    const onChangeQuantity = ( {target}: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(target.value);
        if(isNaN(newQuantity)) return toastError("Debe ser un número");
        if(newQuantity === 0){
            setQuantityCart('');
            timeoutRef.current = setTimeout(() => {
                setQuantityCart(quantity.toString())
            }, 4000);
            return;
        }
        timeoutRef.current && clearTimeout(timeoutRef.current);
    
        setQuantityCart(newQuantity.toString());
        dispatch(changeQuantityProduct({id: _id, quantity: newQuantity}));
    }
    return (
        <Box >
            <Grid container spacing={2} sx={{ mb: 1, mt: 1 }}>
                <Grid item xs={4} sm={2} md={2}>
                <Link>
                    <CardActionArea>
                    <CardMedia
                        image={imgUrl}
                        height={"120px"}
                        sx={{ objectFit: "contain" }}
                        component="img"
                    />
                    </CardActionArea>
                </Link>
                </Grid>

                <GridCenter
                    item
                    xs={4}
                    sm={8}
                    gap={{ xs: 2, sm: 0, md: 6 }}
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems={{ sm: "center" }}
                >
                    <OptionsTittle variant="body1">{title}</OptionsTittle>
                    <OptionsTittle variant="body1">
                        {getPriceFormatted(price)}
                    </OptionsTittle>

                    <ContainerCenter width={"100px"}>
                        <IconButton onClick={HandleRemoveProduct}>
                            <RemoveCircleIcon color="error" />
                        </IconButton>
                        <Input
                            type="text"
                            value={quantityCart}
                            onChange={onChangeQuantity}
                            inputProps={{ style: { textAlign: "center" } }}
                        />
                        <IconButton onClick={HandleAddProduct}>
                            <AddCircleIcon color="primary" />
                        </IconButton>
                    </ContainerCenter>
                </GridCenter>

                <GridCenter item sm={1}>
                    <Total variant='subtitle1'>
                        <Typography display={{ xs: "flex", sm: "none" }}>Total:</Typography>
                        {getPriceFormatted(price * quantity)}
                    </Total>
                </GridCenter>
                <GridCenter item sm={1}>
                    <IconButton onClick={handleDeleteProduct}>
                        <Tooltip title="Eliminar producto">
                        <DeleteForeverIcon color="error" fontSize="large" />
                        </Tooltip>
                    </IconButton>
                </GridCenter>
            </Grid>
            <Divider />
        </Box>
    );
};


const Total = styled(Typography)(({theme})=>({
    display: 'flex',
    fontSize: '1rem',
    gap: '2rem',
    alignItems: 'center',
}))
