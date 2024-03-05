import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ResourceEditor from './ResourceEditor';
import ResourceNoEdit from './ResourceNoEdit'
import {useState} from 'react'

import './ResourceView.css';

const ResourceView =  ({ resource, closeResource, editable }) => {
    const [saved, setSaved] = useState(true);

    return (
        <Box className="editor">
            <Box className="editor-header">
                <Box className="editor-save">
                    <IconButton onClick={closeResource}>
                        <ArrowBackIcon/>
                    </IconButton>

                    { editable ? (saved ? "All changes saved." : "Unsaved changes.") : null }
                </Box>
                <Box>
                    {resource.title}
                </Box>
            </Box>
            <Box className="editor-box">
                { editable ? <ResourceEditor setSaved={setSaved} resource={resource} />
                    : <ResourceNoEdit resource={resource}/> }
            </Box>
        </Box>
    );
};
export default ResourceView;