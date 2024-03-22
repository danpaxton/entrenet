import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Box, TextField, Button } from '@mui/material'
import { api } from '../App';
import './Login.css'
 
const Login = ({ login, setLogin }) => {
    const [password, setPassword] = useState("");
    const [signUpError, setSignUpError] = useState(false);
    const [signUp, setSignUp] = useState(true)
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const { data } = await api.post('/signup', {...login, password });
            if (data.success) {
                setLogin(data.user);
                navigate('/');
                setSignUpError(false);
            } else {
                setSignUpError(true)
            }
        } catch (e) {
            console.log(e)
        }
    };
    
    const handleLogin = async () => {
        try {
            const { data } = await api.post('/login', { email: login.email, password });
            if (data.success) {
                setLogin(data.user);
                navigate('/');
                setSignUpError(false);
            } else {
                setSignUpError(true)
            }
        } catch (e) {
            console.log(e)
        }
    };

    const handleName = attr => name => {
        login[attr] = name.target.value;
    };
    
    const handlePassword = pass => {
        setPassword(pass.target.value);
    };

    const changeLoginButtons = () => {
        setSignUp(!signUp);
    };

    return (
        <Box className="login-page">
            <Box className="login-header">Your gateway to entrepreneurial success.</Box>
            <Box className="login">
                { signUp ?
                <>
                <Box className="login-label">Name</Box>
                <Box className="login-name">
                    <TextField onChange={handleName('first')} className='login-text' placeholder={"First"} fullWidth size='small'></TextField>
                    <TextField onChange={handleName('last')} className='login-text' placeholder={"Last"} fullWidth size='small'></TextField>
                </Box>
                </>
                : null }      
                <Box className="text-padding">
                    <Box className="login-label">E-mail</Box>
                    <TextField error={signUpError} className='login-text' onChange={handleName('email')} fullWidth size='small'></TextField>
                </Box>
                <Box className="text-padding">
                    <Box className="login-label">Password</Box>
                    <TextField error={signUpError} className='login-text' onChange={handlePassword} fullWidth size='small'></TextField>    
                </Box>
                <Box className="login-buttons">
                    <Button onClick={signUp ? handleSignUp : handleLogin} variant='contained'>
                        {signUp ? 'Join' : 'Sign In'}
                    </Button>
                    <Button variant='outlined' onClick={changeLoginButtons} >
                        {signUp ? 'Login' : 'Sign Up'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
 
export default Login;