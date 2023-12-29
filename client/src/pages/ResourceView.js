import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/Editor';

import "./ResourceView.css"

// Load clicked resource into editor element, and update save position.
const ResourceView = (props) => {
    const { data } = props;
    const editor = Editor(data);
    return (
        <Box className="editor-view">
            <Box id="editorjs"/>
        </Box>
    );
};
 
export default ResourceView;