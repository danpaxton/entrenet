import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Box, TextField, Button } from '@mui/material'
import './Login.css'
 
const Login = (props) => {
    const { username, setUsername, setToken } = props

    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleJoin = () => {
        setToken("token");
        navigate('/home')
        console.log(username, password)
    }

    return (
        <Box className="login-page">
            <Box className="login-text">Find your entrepreneurial success.</Box>
            <Box className="login">
                <Box>
                    <Box className="login-help">Email</Box>
                    <TextField onChange={t => setUsername(t.target.value)} fullWidth size='small'></TextField>
                </Box>
                <Box>
                    <Box className="login-help">Password</Box>
                    <TextField onChange={t => setPassword(t.target.value)} fullWidth size='small'></TextField>    
                </Box>
                <Button onClick={handleJoin} variant='contained'>
                    Join
                </Button>
            </Box>
        </Box>
    );
};
 
export default Login;