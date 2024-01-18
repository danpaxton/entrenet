import './Navbar.css'
import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { Box, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBox from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import logo from '../logo.png';

const pages = ["/", "/about", "/resources", "/blogs", "/forums", "/contact"];

const pageNames = ["home", "about", "resources", "blogs", "forums", "contact"];

const Navbar = (props) => {
    const { login, setLogin } = props;
    
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const location = useLocation();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

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

    const handleTabStyle = (page) => {
        return page === location.pathname ? "active tab" : "unactive tab";
    }

    return (
        <>
            <Box color="secondary" className="nav-bar">
                <Box className="nav-menu">
                    <img className="logo" src={logo} alt="EntreNet" />
                    {pages.map((page, i) =>
                        <NavLink to={page} className={handleTabStyle(page)}>
                            {pageNames[i]}
                        </NavLink>
                    )}
                </Box>
                <Box className="profile">
                    { login.token ?
                    <IconButton onClick={handleClick}>
                        <AccountCircleIcon className="active" fontSize='large'/>
                    </IconButton> : <NavLink to="/login" className="login-item">LOGIN</NavLink>
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