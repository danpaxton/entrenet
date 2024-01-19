import { Backdrop, Box, List, ListItem } from '@mui/material';
import ResourceEditor from '../editors/ResourceEditor';
import ResourceView from '../editors/ResourceView';
import { useState } from 'react';
import "./Resources.css";

const Resource = (title, desc) => ({ title, desc, data: {} });

const Resources = ({ login }) => {
    const [editor, setEditor] = useState(ResourceEditor());
    const [resources, setResources] = useState([Resource('first source', 'initial desc')]);
    const [viewEditor, setViewEditor] = useState(false);

    const loadEditor = data => {
        setEditor(ResourceEditor(data));
        setViewEditor(true);
    };

    const closeEditor = () => {
        setViewEditor(false);
    };

    const saveResource = () => {
        editor.save().then(output => {
            console.log(output)
        }).catch((error) => {
            console.log('Error saving to editor.', error)
        })
    }

    const newResource = (title, desc) => {
        resources.push(Resource(title, desc));
        setResources(resources);
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
                <ResourceView closeEditor={closeEditor} saveResource={saveResource} />
            </Backdrop>
        </Box> 
    );
};
export default Resources;