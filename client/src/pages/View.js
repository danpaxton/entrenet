import { Box, Button } from '@mui/material';
import './View.css';
// Load clicked resource into editor element, and update save position.

const saveEditor = editor => {
    editor.save().then(output => {
        console.log(output)
    }).catch((error) => {
        console.log('Error saving to editor.', error)
    })
}

const View = props => {
    const { editor, title } = props;
    
    return (
        <Box className="editor">
            <Box className="editor-save">
                <Button size="small" onClick={() => saveEditor(editor)}>Save</Button>
            </Box>
            <Box className="editor-box">
                <Box id="editorjs"/>
            </Box>
        </Box>
    );
};
export default View;