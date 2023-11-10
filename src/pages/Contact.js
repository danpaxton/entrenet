import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material'
import './Contact.css'

const Contact = (props) => {
    const { login } = props

    return (
        <Box className="contact-page">
            <Box className="contact-header">Contact Us</Box>
            <Box className="contact">
                <Box className="contact-info">
                    <Box className="contact-label">Name</Box>
                    <Box className="contact-name">
                        <TextField className='contact-text' defaultValue={login.first} placeholder={"First"} fullWidth size='small'></TextField>
                        <TextField className='contact-text' defaultValue={login.last} placeholder={"Last"} fullWidth size='small'></TextField>
                    </Box>
                    <Box className="contact-label">E-mail</Box>
                    <TextField className='contact-text' defaultValue={login.email} fullWidth size='small'></TextField>
                </Box>
                <Box className="subject-padding">
                    <Box className="contact-label">Subject</Box>
                    <TextField className='contact-text' fullWidth size='small'></TextField>
                </Box>
                <Box className="message-padding">
                    <Box className="contact-label">Comments</Box>
                    <TextField className='contact-text' multiline fullWidth rows={5}></TextField>    
                </Box>
                <Button variant='contained'>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};
 
export default Contact;