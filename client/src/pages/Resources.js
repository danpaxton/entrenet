import { Backdrop, Box, List } from '@mui/material';
import { useState } from 'react';

import ResourceView from '../editors/ResourceView';
import "./Resources.css";

const Resource = (title, desc) => ({ title, desc, data: "" });

const Resources = ({ login }) => {
    const [resourceData, setResourceData] = useState(<Box/>);
    const [resources, setResources] = useState(
        [
            Resource('First source', 'This is a description for the first source, resources are the main source of information for the users of entrenet.'),
            Resource('Second source', 'This is a description for the first source, resources are the main source of information for the users of entrenet. This resource has more text in the description.'),
            Resource('Third source', 'This resource has a brief description.')
        ]
        );
    const [viewResource, setViewResource] = useState(false);

    const loadResource = data => {
        setResourceData(data);
        setViewResource(true);
    };

    const closeResource = () => {
        setViewResource(false);
    };

    const newResource = (title, desc) => {
        resources.push(Resource(title, desc));
        setResources(resources);
    };

    return (
        <Box className="resource-page">
            <List className="resource-list">
                {resources.map((e, i) =>
                    <Box className="resource-item">
                        <Box className="resource-title" onClick={() => loadResource(e.data)} >{e.title}</Box>
                        <Box className="resource-desc">{e.desc}</Box>
                    </Box>
                )}
            </List>
            <Backdrop onDoubleClick={closeResource} className="resource-backdrop" open={viewResource}>
                <ResourceView closeResource={closeResource} resourceData={resourceData}/>
            </Backdrop>
        </Box> 
    );
};
export default Resources;