import './Navbar.css'
import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { Box, IconButton, Menu, MenuItem, ListItemIcon, Tabs, Tab } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBox from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import logo from '../logo.png';

const pages = ["/", "/about", "/resources", "/forums", "/contact", 'login'];

const pageNames = ["home", "about", "resources", "forums", "contact"];


const Navbar = ({ login, setLogin, tabValue, setTabValue }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const open = Boolean(anchorEl);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
        setTabValue('')
    };

    const handleSignUpClick = () => {
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
        setLogin({ first: "", last: "", username: "", token: "" });
        handleNav('/login')()
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        navigate(newValue);
    };

    return (
        <Box color="secondary" className="nav-bar">
            <Box className="nav-menu">
                <img className="logo" src={logo} alt="EntreNet" />
                <Tabs value={tabValue} onChange={handleTabChange} textColor="secondary" indicatorColor='primary'>
                    {pages.map((page, i) =>
                        <Tab sx={{ color: "white"}} key={i} label={pageNames[i]} value={page}/>
                    )}
                </Tabs>
            </Box>
            <Box className="profile">
                {login.token ?
                    <IconButton onClick={handleProfileClick}>
                        <AccountCircleIcon className="account-button" fontSize='large' />
                    </IconButton> : <NavLink onClick={handleSignUpClick} to="/login" className="login-button">SIGN UP</NavLink>
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