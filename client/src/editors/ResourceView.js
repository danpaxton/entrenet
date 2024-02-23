import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ResourceEditor from './ResourceEditor';
import {useState} from 'react'

import './ResourceView.css';

const ResourceView =  ({ closeResource, resource, setResource }) => {
    const [admin, setAdmin] = useState(true);
    return (
        <Box className="editor">
            <Box className="editor-header">
                <IconButton onClick={closeResource}>
                    <ArrowBackIcon/>
                </IconButton>
                <Box>
                    {resource.title}
                </Box>
            </Box>
            <Box className="editor-box">
                <ResourceEditor resource={resource} setResource={setResource} admin={admin}/>
            </Box>
        </Box>
    );
};
export default ResourceView;