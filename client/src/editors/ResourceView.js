import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ResourceView.css';

const ResourceView =  ({ closeEditor, saveResource }) => {
    
    return (
        <Box className="editor">
            <Box className="editor-return">
                <IconButton onClick={closeEditor}><ArrowBackIcon/></IconButton>
            </Box>
            <Box className="editor-box">
                <div onKeyDown={saveResource} id="editorjs"/>
            </Box>
        </Box>
    );
};
export default ResourceView;