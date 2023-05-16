import { Box } from "@mui/material"
import { LoginForm } from "../components"

const Login = () => {
    return (
        <Box    sx={{
            display: "grid",
            placeContent: "center",
            placeItems: "center",
            height: "100vh", 
            background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(172,9,84,1) 0%, rgba(156,39,176,1) 53%, rgba(72,0,255,0.9472163865546218) 100%)"
        }}
        >
            
            <LoginForm/>

        </Box>
    )
}

export default Login