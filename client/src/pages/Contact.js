import { Box, TextField, Button } from '@mui/material'
import './Contact.css'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = ({ login }) => {
    const form = useRef();
    const service_id = process.env.REACT_APP_SERVICE_ID;
    const template_id = process.env.REACT_APP_TEMPLATE_ID;
    const public_key = process.env.REACT_APP_PUBLIC_KEY;

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(service_id, template_id, form.current, {
                publicKey: public_key,
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    console.log("message sent")
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };
    return (
        // <Box className="contact-page">
        //     <Box className="contact-header">Contact Us</Box>
        //     <Box className="contact">
        //         <Box className="contact-info">
        //             <Box className="contact-label">Name</Box>
        //             <Box className="contact-name">
        //                 <TextField className='contact-text' defaultValue={login.first} placeholder={"First"} fullWidth size='small'></TextField>
        //                 <TextField className='contact-text' defaultValue={login.last} placeholder={"Last"} fullWidth size='small'></TextField>
        //             </Box>
        //             <Box className="contact-label">E-mail</Box>
        //             <TextField className='contact-text' defaultValue={login.email} fullWidth size='small'></TextField>
        //         </Box>
        //         <Box className="subject-padding">
        //             <Box className="contact-label">Subject</Box>
        //             <TextField className='contact-text' fullWidth size='small'></TextField>
        //         </Box>
        //         <Box className="message-padding">
        //             <Box className="contact-label">Comments</Box>
        //             <TextField className='contact-text' multiline fullWidth rows={5}></TextField>    
        //         </Box>
        //         <Button variant='contained'>
        //             Submit
        //         </Button>
        //     </Box>
        // </Box>
        <div className='container'>
            <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="from_name" />
                <label>Email</label>
                <input type="email" name="from_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
            </form>
        </div>

    );
};

export default Contact;