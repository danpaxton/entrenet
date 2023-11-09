import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material'
import './Login.css'
 
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
                    <TextField onChange={t => setPassword(t.target.value)} fullWidth size='small'>{password}</TextField>    
                </Box>
                <Button onClick={() => console.log(username, password)} variant='contained'>
                    Join
                </Button>
            </Box>
        </Box>
    );
};
 
export default Login;