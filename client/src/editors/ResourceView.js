import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ResourceEditor from './ResourceEditor';
import './ResourceView.css';

const ResourceView =  ({ closeResource, resourceData }) => {
    
    return (
        <Box className="editor">
            <Box>
                <IconButton onClick={closeResource}>
                    <ArrowBackIcon/>
                </IconButton>
            </Box>
            <Box className="editor-box">
                { false ? resourceData :
                    <ResourceEditor resourceData={resourceData} /> }
            </Box>
        </Box>
    );
};
export default ResourceView;