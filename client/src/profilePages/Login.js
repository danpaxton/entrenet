import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Box, TextField, Button } from '@mui/material'
import './Login.css'
 
const Login = (props) => {
    const { login, setLogin } = props;

    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleJoin = () => {
        setLogin({...login, token: "token" });
        navigate('/');
        console.log(login.email, password);
    };

    const handleName = attr => name => {
        login[attr] = name.target.value;
        setLogin(login);
    };
    
    const handlePassword = pass => {
        setPassword(pass.target.value);
    };

    return (
        <Box className="login-page">
            <Box className="login-header">Your gateway to entrepreneurial success.</Box>
            <Box className="login">
                <Box className="login-label">Name</Box>
                <Box className="login-name">
                    <TextField onChange={handleName('first')} className='login-text' placeholder={"First"} fullWidth size='small'></TextField>
                    <TextField onChange={handleName('last')} className='login-text' placeholder={"Last"} fullWidth size='small'></TextField>
                </Box>
                <Box className="text-padding">
                    <Box className="login-label">E-mail</Box>
                    <TextField className='login-text' onChange={handleName('email')} fullWidth size='small'></TextField>
                </Box>
                <Box className="text-padding">
                    <Box className="login-label">Password</Box>
                    <TextField className='login-text' onChange={handlePassword} fullWidth size='small'></TextField>    
                </Box>
                <Button onClick={handleJoin} variant='contained'>
                    Join
                </Button>
            </Box>
        </Box>
    );
};
 
export default Login;