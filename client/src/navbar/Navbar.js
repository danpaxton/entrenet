import './Navbar.css'
import { useState, useEffect } from "react";
import { useNavigate, useLocation  } from "react-router-dom"
import { Box, Button,  IconButton, Menu, MenuItem, ListItemIcon, Tabs, Tab } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBox from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import logo from '../logo.png';
import { api } from '../App';

const pages = ["/", "/about", "/resources", "/forums", "/contact"];

const pageNames = ["home", "about", "resources", "forums", "contact"];


const Navbar = ({ cookies, removeCookie, login, setLogin, tabValue, setTabValue }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const open = Boolean(anchorEl);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
        setTabValue('');
    };

    const handleSignUpClick = () => {
        navigate('/login');
        setTabValue('')
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNav = page => () => {
        handleClose();
        navigate(page);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        setLogin({ admin: false, logged: false, first: "", last: "", email:"", username: "" });
        removeCookie("token");
        handleSignUpClick();
    };

    const handleTabChange = (event, newValue) => {
        if (login.logged) navigate(newValue);
    };
    
    useEffect(() => {
        if (!cookies.token) {
            handleSignUpClick();
        }
        api.get("/").then(({ data }) => {
            if (data.status) {
                setLogin(data.user);
                setTabValue(location.pathname);
            } else {
                removeCookie("token");
                navigate("/login");
                setTabValue('');
            }
        });
    }, [cookies, navigate, removeCookie])

    return (
        <Box color="secondary" className="nav-bar">
            <Box className="nav-menu">
                <img className="logo" src={logo} alt="EntreNet"/>
                <Tabs value={tabValue} onChange={handleTabChange} textColor='secondary' indicatorColor='primary'>
                    {pages.map((page, i) =>
                        <Tab sx={{ color: !login.logged ? 'gray' : 'white' }} key={i} label={pageNames[i]} value={page}/>
                    )}
                </Tabs>
            </Box>
            <Box className="profile">
                {login.logged ?
                    <IconButton onClick={handleProfileClick}>
                        <AccountCircleIcon className="account-button" fontSize='large' />
                    </IconButton> : <Button onClick={handleSignUpClick} variant='outlined' color="secondary">SIGN UP</Button>
                }
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem divider onClick={handleNav('/profile')}>
                    <Box className="profile-info">
                        <Box className="user-name">{login.first + " " + login.last}</Box>
                        <Box className="user-email">{login.email}</Box>
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleNav('/profile')}>
                    <ListItemIcon><AccountBox fontSize="small" /></ListItemIcon>Profile
                </MenuItem>
                <MenuItem onClick={handleNav('/settings')}>
                    <ListItemIcon><Settings fontSize="small" /></ListItemIcon>Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon><Logout fontSize="small" /></ListItemIcon>Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Navbar;