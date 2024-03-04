import { Backdrop, Box, IconButton, List, Dialog, DialogActions, TextField } from '@mui/material';
import ResourceView from '../editors/ResourceView';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';


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

const Resources = ({ login, admin }) => {
    const [resourceId, setResourceId] = useState(null);
    const [resources, setResources] = useState([]);
    const [viewResource, setViewResource] = useState(false);
    const [openNewResource, setOpenNewResource] = useState(false);
    const [editable, setEditable] = useState(false);
    const [resourceTitle, setResourceTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [titleLabel, setTitleLabel] = useState("Enter file name.")

    // Fetch all resources.
    const fetchResources = async () => {
        try {
            const { data } = await api.get('/resources');
            setResources(data);
        } catch(err) {
            console.log(err);
        }
    };

    // Create a new resource
    const newResource = async title => {
        try {
            const { data } = await api.post('/resource/add', Resource(title))
            setResources(data);
        } catch(err) {
            console.log(err);
        }
    };

    const closeResource = () => {
        setResourceId(null);
        setViewResource(false);
        setEditable(false);
    };

    const loadResource = data => {
        data.views += 1;
        setResourceId(data._id);
        setViewResource(true);
    };

    const handleEdit = data => {
        setEditable(true);
        setResourceId(data._id);
        setViewResource(true);
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

    const handleOpenNewResource = () => {
        setOpenNewResource(true);
    };

    const handleResourceTitleChange = f => {
        setResourceTitle(f.target.value);
    };
    
    const handleLike = data => {
        data.likes += 1;
    };

    const formatDate = date => {
        const d = new Date(date);
        return d.getUTCMonth() + "/" + d.getUTCDate() + "/" + d.getUTCFullYear().toString().slice(2, 4)
    };
    
    // Fetch resources on page load.
    useEffect(() => {
        fetchResources();
    });

    return (
        <Box className="resource-page">
             <Dialog open={openNewResource}>
                <DialogActions className="resource-new">
                    <TextField label={titleLabel} error={titleError} variant="standard" onChange={handleResourceTitleChange}/>
                    <Box className="resource-new-buttons">
                        <IconButton onClick={handleCreateNewResource}><CheckIcon size="small"/></IconButton>
                        <IconButton onClick={handleCloseNewResource}><CloseIcon size="small"/></IconButton>
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
                            { viewResource ? null :
                            <Box className="resource-stats">
                                <Box className="resource-like-edit">
                                    <IconButton onClick={() => handleLike(e)}><ThumbUpAltIcon/></IconButton>{e.likes}
                                    { admin ? <IconButton onClick={() => handleEdit(e)}><EditIcon size="small"/></IconButton> : null }
                                </Box>
                                <Box className="resource-view">{e.views}<VisibilityIcon/></Box>
                            </Box>
                            }
                            <Backdrop onDoubleClick={closeResource} open={viewResource && resourceId === e._id} className="resource-backdrop">
                                <ResourceView id={i} closeResource={closeResource} editable={editable} resource={e} />
                            </Backdrop>
                        </Box>
                    )}
                </List>
            </Box>
        </Box> 
    );
};
export default Resources;