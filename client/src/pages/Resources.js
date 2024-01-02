import { Backdrop, Box, List, ListItem } from '@mui/material';
import Editor from '../editor/Editor';
import "./Resources.css"
import View from './View';


const Resources = (props) => {
    const { resources, setResources, setEditor, viewEditor, setViewEditor } = props;


    const loadEditor = data => {
        setEditor(Editor(data));
        setViewEditor(true);
    };

    const closeEditor = () => {
        setViewEditor(false);
    };

    const newResource = (title, desc) => {
        resources.push({ title, desc, data: [] });
        setResources(resources);
        loadEditor();
    };

    return (
        <Box className="resource-page">
            <List>
                {resources.map((e, i) =>
                    <ListItem key={i} onClick={() => loadEditor(e.data)}>
                        {e.title + " " + e.desc}
                    </ListItem>
                )}
            </List>
            <Backdrop
                sx={{ color: '#fff' }}
                open={viewEditor}>
                <View/>
            </Backdrop>
        </Box> 
    );
};
export default Resources;