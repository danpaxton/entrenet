import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ResourceEditor from './ResourceEditor';
import {useState} from 'react'

import './ResourceView.css';

const ResourceView =  ({ closeResource, resource, setResource }) => {
    const [admin, setAdmin] = useState(true);
    const [saved, setSaved] = useState(true);
    return (
        <Box className="editor">
            <Box className="editor-header">
                <Box className="editor-save">
                    <IconButton onClick={closeResource}>
                        <ArrowBackIcon/>
                    </IconButton>
                    {saved ? "All changes saved." : "Unsaved changes."}
                </Box>
                <Box>
                    {resource.title}
                </Box>
            </Box>
            <Box className="editor-box">
                <ResourceEditor resource={resource} setResource={setResource} setSaved={setSaved} admin={admin}/>
            </Box>
        </Box>
    );
};
export default ResourceView;