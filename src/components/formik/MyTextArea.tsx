import { ErrorMessage, useField } from "formik"
import {Select, Typography, TextareaAutosize} from '@mui/material';

interface Props{
    name: string;
    placeholder?: string;
    [x: string] : any;
}

export const MyTextArea = ({label, ...props}:Props) => {

    const [field] = useField(props);

    return (
        <>
            <TextareaAutosize {...field} {...props}/>
            <Typography color={"error"}>
                <ErrorMessage name={props.name} component="span" className="error"/>
            </Typography>

        </>
    )
}