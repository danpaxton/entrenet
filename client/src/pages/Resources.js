import React from 'react';
import { Box } from '@mui/material';
import Editor from "../editor/Editor";

import "./Resources.css"

const Resources = () => {
    return (
        <Box className="resource-page">
            <Box className="editor-space">
                <Editor/>
            </Box>
        </Box>
    );
};
 
export default Resources;