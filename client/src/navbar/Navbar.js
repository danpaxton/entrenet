import './Navbar.css'
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { Box, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBox from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const Navbar = (props) => {
    const { login, setLogin } = props
    
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleNav = page => () => {
        handleClose()
        navigate(page)
    };

    const handleLogout = () => {
        setLogin({ first: "", last: "", username: "", token: "" });
        handleNav('/login')()
    };

    const formatName = (first, last) => {
        const a = first.charAt(0).toUpperCase()
        const b = last.charAt(0).toUpperCase()

        return a + first.substring(1) + ' ' + b + last.substring(1)
    };

    return (
        <>
            <Box className="nav-bar">
                <Box className="nav-menu">
                    <NavLink to="/" className="nav-item">
                        HOME
                    </NavLink>
                    <NavLink to="/about" className="nav-item">
                        ABOUT
                    </NavLink>
                    <NavLink to="/resources" className="nav-item">
                        RESOURCES
                    </NavLink>
                    <NavLink to="/blogs" className="nav-item">
                        BLOGS
                    </NavLink>
                    <NavLink to="/forums" className="nav-item">
                        FORUMS
                    </NavLink>
                    <NavLink to="/contact" className="nav-item">
                        CONTACT
                    </NavLink>
                </Box>
                <Box className="profile">
                    { login.token ?
                    <IconButton onClick={handleClick}>
                        <AccountCircleIcon className="profile-icon" fontSize='large'/>
                    </IconButton> : <NavLink to="/login" className="profile-icon">LOGIN</NavLink>
                    }
                </Box>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem divider onClick={handleNav('/profile')}>
                        <Box className="profile-info">
                            <Box className="user-name">{formatName(login.first, login.last)}</Box>
                            <Box className="user-email">{login.email}</Box>
                        </Box>
                    </MenuItem>
                    <MenuItem onClick={handleNav('/profile')}>
                        <ListItemIcon><AccountBox fontSize="small"/></ListItemIcon>Profile
                    </MenuItem>
                    <MenuItem onClick={handleNav('/settings')}>
                        <ListItemIcon><Settings fontSize="small"/></ListItemIcon>Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon><Logout fontSize="small"/></ListItemIcon>Logout
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
};
 
export default Navbar;