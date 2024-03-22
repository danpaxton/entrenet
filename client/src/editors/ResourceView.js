import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ResourceEditor from './ResourceEditor';
import ResourceNoEdit from './ResourceNoEdit'
import {useState} from 'react'

import './ResourceView.css';

const ResourceView =  ({ resource, closeResource, editable, fetchResources }) => {
    const [saved, setSaved] = useState(true);
    return (
        <Box className="editor">
            <Box className="editor-header">
                <Box className="editor-save">
                    <IconButton onClick={closeResource}>
                        <ArrowBackIcon/>
                    </IconButton>
                    { saved ? "All changes saved." : "Unsaved changes." }
                </Box>
                <Box className="editor-title">
                    {resource.title}
                </Box>
            </Box>
            <Box className="editor-box">
                { editable ? <ResourceEditor fetchResources={fetchResources} setSaved={setSaved} resource={resource} />
                    : <ResourceNoEdit resource={resource}/> }
            </Box>
        </Box>
    );
};
export default ResourceView;