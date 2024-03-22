import { Box, IconButton,  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import './Profile.css' 

const Profile = ({ login }) => {
    return login ?
        <Box className="profile-page">
            <Box className="profile-header">
                <Box className="profile-name">{login.first} {login.last}</Box>
                <Box>{login.email}</Box>
                <Box className="profile-connections">
                    <Box className="profile-conn-number">{123}</Box>connections
                    <IconButton><SearchIcon/></IconButton>
                    <IconButton><AddIcon/></IconButton>
                </Box>
            </Box>
            <Box>Ventures</Box>
            <Box>Skills</Box>
        </Box> : null
};
 
export default Profile;