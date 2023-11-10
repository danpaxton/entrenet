import './Navbar.css'
import { useState } from "react";
import { NavLink } from "react-router-dom"
import { Box, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBox from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const Navbar = (props) => {
    const { token, setToken } = props
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        setToken('')
    }

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
                    { token ?
                    <IconButton onClick={handleClick}>
                        <AccountCircleIcon className="profile-icon" fontSize='large'/>
                    </IconButton> : <NavLink to="/login" className="profile-icon">LOGIN</NavLink>
                    }
                </Box>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem divider onClick={handleClose}>{props.username}</MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon><AccountBox fontSize="small"/></ListItemIcon>
                            <NavLink to="/profile" className="profile-nav">Profile</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon><Settings fontSize="small"/></ListItemIcon>
                            <NavLink to="/settings" className="profile-nav">Settings</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon><Logout fontSize="small"/></ListItemIcon>
                          <NavLink to="/login" className="profile-nav">Logout</NavLink>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
};
 
export default Navbar;