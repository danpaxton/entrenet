import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Card, CardContent, Typography, IconButton, Avatar, CardActions, TextField } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';


const Forum = () => ({ text: "", views: 0, likes: 0, date: "" });

const Forums = ({ author, content }) => {
    const [forums, setForums] = useState([]);
    const [likes, setLikes] = useState(0);

    const addForum = () => {
        // TODO add new forum to forums list.
    };

    return (
        <div>
            <h1>Forums</h1>
            {forums.map((e, i) => {
                <Box key={i}>
                    {e}
                </Box>
            })}

        </div>
    );
};

export default Forums;