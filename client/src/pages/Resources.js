import { Backdrop, Box, IconButton, List, Dialog, DialogActions, TextField } from '@mui/material';
import ResourceView from '../editors/ResourceView';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { api } from '../App';
import "./Resources.css";

const Resource = (title = "") => ({ 
    title, 
    data: "", 
    likes: 0, 
    views: 0, 
    date: new Date() 
});

const Resources = ({ login }) => {
    const [resource, setResource] = useState(Resource());
    const [resources, setResources] = useState(
        [ 
            Resource('First source'), 
            Resource('Second source'), 
            Resource('Third source') 
        ]
    );
    const [viewResource, setViewResource] = useState(false);
    const [openNewResource, setOpenNewResource] = useState(false);
    const [resourceTitle, setResourceTitle] = useState("");

    const fetchResources = () => {
        try {
            api.get('/resources').then(data => console.log(data));
        } catch(err) {
            console.log(err);
        }
    }

    const newResource = title => {
        try {
            api.post('/resource/add', Resource(title)).then(data => console.log(data))
        } catch(err) {
            console.log(err);
        }
    };

    const handleOpenNewResource = () => {
        setOpenNewResource(true);
    };

    const handleResourceTitleChange = f => {
        setResourceTitle(f.target.value);
    }
    
    const loadResource = data => {
        data.views += 1;
        setResource(data);
        setViewResource(true);
    };

    const handleLike = data => {
        data.likes += 1;
        setResource(data);
    }

    const closeResource = () => {
        setResource(Resource());
        setViewResource(false);
    };

    const handleCloseNewResource = () => {
        setOpenNewResource(false);
        setResourceTitle("");
    }
    
    const handleCreateNewResource = () => {
        newResource(resourceTitle);
        handleCloseNewResource();
    }

    return (
        <Box className="resource-page">
             <Dialog open={openNewResource}>
                <DialogActions className="resource-new">
                    <TextField label={"Enter file name."} variant="standard" onChange={handleResourceTitleChange}/>
                    <Box className="resource-new-buttons">
                        <IconButton onClick={handleCreateNewResource}><CheckIcon/></IconButton>
                        <IconButton onClick={handleCloseNewResource}><CloseIcon/></IconButton>
                    </Box>
                </DialogActions> 
            </Dialog>
            <Box className="resource-header">
                <IconButton onClick={handleOpenNewResource} sx={{ padding: '0px'}}><AddIcon/></IconButton>
                <IconButton sx={{ padding: '0px'}}><RemoveIcon/></IconButton>
            </Box>
            <List className="resource-list">
                {resources.map((e, i) =>
                    <Box className="resource-item" key={i}>
                        <Box className="resource-title" onClick={() => loadResource(e)} >{e.title}
                            <Box className="resource-date">
                                {e.date.getUTCMonth() + "/" + e.date.getUTCDate() + "/" + e.date.getUTCFullYear().toString().slice(2, 4)}
                            </Box>
                        </Box>
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