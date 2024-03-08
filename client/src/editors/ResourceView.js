import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ResourceEditor from './ResourceEditor';
import ResourceNoEdit from './ResourceNoEdit'
import {useState} from 'react'

import './ResourceView.css';

const ResourceView =  ({ handleLike, resource, closeResource, editable }) => {
    const [saved, setSaved] = useState(true);

    return (
        <Box className="editor">
            <Box className="editor-header">
                <Box className="editor-save">
                    <IconButton onClick={closeResource}>
                        <ArrowBackIcon/>
                    </IconButton>
                    { editable ? 
                        (saved ? "All changes saved." : "Unsaved changes.") 
                        : <Box className='editor-likes'>
                            <IconButton onClick={handleLike}><ThumbUpAltIcon/></IconButton>{resource.likes}
                        </Box> }
                </Box>
                <Box className="editor-title">
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