import { Backdrop, Box, List } from '@mui/material';
import ResourceEditor from '../editors/ResourceEditor';
import ResourceView from '../editors/ResourceView';
import { useState } from 'react';
import "./Resources.css";

const Resource = (title, desc) => ({ title, desc, data: {} });

const Resources = ({ login }) => {
    const [editor, setEditor] = useState(ResourceEditor());
    const [resources, setResources] = useState(
        [
            Resource('First source', 'This is a description for the first source, resources are the main source of information for the users of entrenet.'),
            Resource('Second source', 'This is a description for the first source, resources are the main source of information for the users of entrenet. This resource has more text in the description.'),
            Resource('Third source', 'This resource has a brief description.')
        ]
        );
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
            <List className="resource-list">
                {resources.map((e, i) =>
                    <Box className="resource-item">
                        <Box className="resource-title" onClick={() => loadEditor(e.data)} >{e.title}</Box>
                        <Box className="resource-desc">{e.desc}</Box>
                    </Box>
                )}
            </List>
            <Backdrop onDoubleClick={closeEditor} sx={{ color: '#fff' }} open={viewEditor}>
                <ResourceView closeEditor={closeEditor} saveResource={saveResource} />
            </Backdrop>
        </Box> 
    );
};
export default Resources;