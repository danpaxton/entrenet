import { Backdrop, Box, IconButton, List, Dialog, DialogActions, TextField } from '@mui/material';
import ResourceView from '../editors/ResourceView';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from 'react';
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
    const [resources, setResources] = useState([]);
    const [viewResource, setViewResource] = useState(false);
    const [openNewResource, setOpenNewResource] = useState(false);

    const [resourceTitle, setResourceTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [titleLabel, setTitleLabel] = useState("Enter file name.")

    const fetchResources = async () => {
        try {
            const { data } = await api.get('/resources');
            setResources(data);
        } catch(err) {
            console.log(err);
        }
    };

    const newResource = async title => {
        try {
            const { data } = await api.post('/resource/add', Resource(title))
            setResources(data);
        } catch(err) {
            console.log(err);
        }
    };

    const handleOpenNewResource = () => {
        setOpenNewResource(true);
    };

    const handleResourceTitleChange = f => {
        setResourceTitle(f.target.value);
    };
    
    const loadResource = data => {
        data.views += 1;
        setResource(data);
        setViewResource(true);
    };

    const handleLike = data => {
        data.likes += 1;
        setResource(data);
    };

    const closeResource = () => {
        setResource(Resource());
        setViewResource(false);
    };

    const handleCloseNewResource = () => {
        setTitleError(false);
        setTitleLabel("Enter file name.");
        setOpenNewResource(false);
        setResourceTitle("");
    };
    
    const handleCreateNewResource = () => {
        if (resourceTitle.length > 65) {
            setTitleError(true);
            setTitleLabel("Maximum title length.")
        } else {
            setTitleError(false);
            setTitleLabel("Enter file name.");
            newResource(resourceTitle);
            handleCloseNewResource();
        }
    };

    const formatDate = date => {
        const d = new Date(date);
        return d.getUTCMonth() + "/" + d.getUTCDate() + "/" + d.getUTCFullYear().toString().slice(2, 4)
    };
    
    useEffect(() => {
        fetchResources();
    });

    return (
        <Box className="resource-page">
             <Dialog open={openNewResource}>
                <DialogActions className="resource-new">
                    <TextField label={titleLabel} error={titleError} variant="standard" onChange={handleResourceTitleChange}/>
                    <Box className="resource-new-buttons">
                        <IconButton size="small" onClick={handleCreateNewResource}><CheckIcon/></IconButton>
                        <IconButton size="small" onClick={handleCloseNewResource}><CloseIcon/></IconButton>
                    </Box>
                </DialogActions> 
            </Dialog>
            <Box className="resource-display">
                <Box className="resource-header"> <IconButton onClick={handleOpenNewResource} sx={{ padding: '0px'}}><AddIcon/></IconButton>
                    <IconButton sx={{ padding: '0px'}}><RemoveIcon/></IconButton>
                </Box>
                <List className="resource-list">
                    {resources.map((e, i) =>
                        <Box className="resource-item" key={i}>
                            <Box className="resource-title" onClick={() => loadResource(e)} >{e.title}
                                <Box className="resource-date">{formatDate(e.date)}</Box>
                            </Box>
                            <Box className="resource-stats">
                                <Box className="resource-like"><IconButton onClick={() => handleLike(e)}><ThumbUpAltIcon/></IconButton>{e.likes}</Box>
                                <Box className="resource-view">{e.views}<VisibilityIcon/></Box>
                            </Box>
                        </Box>
                    )}
                </List>
            </Box>
            <Backdrop onDoubleClick={closeResource} open={viewResource} className="resource-backdrop">
                <ResourceView closeResource={closeResource} resource={resource} setResource={setResource}/>
            </Backdrop>
        </Box> 
    );
};
export default Resources;