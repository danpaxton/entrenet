import { Backdrop, Box, Button, IconButton, List } from '@mui/material';
import ResourceView from '../editors/ResourceView';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import { useState } from 'react';
import "./Resources.css";

const Resource = title => ({ title, data: "resource data", likes: 0, views: 0 });

const Resources = ({ login }) => {
    const [resource, setResource] = useState(Resource(''));
    const [resources, setResources] = useState(
        [ Resource('First sourceWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'), 
          Resource('Second source'), 
          Resource('Third source') 
        ]
        );
    const [viewResource, setViewResource] = useState(false);

    const loadResource = data => {
        if (true) { // Only increment if it is a unique user.
            data.views += 1;
        }
        setResource(data);
        setViewResource(true);
    };

    const handleLike = data => {
        if (true) { // Only incrment if it is a unique like.
            data.likes += 1
        }
        setResource(data);
    }

    const closeResource = () => {
        setResource(Resource(''));
        setViewResource(false);
    };

    const newResource = (title, desc) => {
        resources.push(Resource(title, desc));
        setResources(resources);
    };

    return (
        <Box className="resource-page">
            <Box className="resource-header">
                <IconButton sx={{ padding: '0px'}}><AddIcon/></IconButton>
                <IconButton sx={{ padding: '0px'}}><RemoveIcon/></IconButton>
            </Box>
            <List className="resource-list">
                {resources.map((e, i) =>
                    <Box className="resource-item">
                        <Box className="resource-title" onClick={() => loadResource(e)} >{e.title}</Box>
                        <Box className="resource-stats">
                            <Box className="resource-like"><IconButton onClick={() => handleLike(e)}><ThumbUpAltIcon/></IconButton>{e.likes}</Box>
                            <Box className="resource-view">{e.views}<VisibilityIcon/></Box>
                        </Box>
                    </Box>
                )}
            </List>
            <Backdrop onDoubleClick={closeResource} open={viewResource} className="resource-backdrop">
                <ResourceView closeResource={closeResource} resource={resource} setResource={setResource}/>
            </Backdrop>
        </Box> 
    );
};
export default Resources;