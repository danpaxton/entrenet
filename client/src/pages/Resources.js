import { Backdrop, Box, InputLabel, IconButton, List, 
    Dialog, DialogActions, TextField, Select, MenuItem, FormControl } from '@mui/material';
import ResourceView from '../editors/ResourceView';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useState, useEffect } from 'react';
import { api } from '../App';
import "./Resources.css";

const Resource = (title = "") => ({ 
    title, 
    data: "", 
    views: [],
    date: new Date() 
});

const Resources = ({ sortDate, login, resources, setResources, formatDate }) => {
    const [resourceId, setResourceId] = useState(null);
    const [viewResource, setViewResource] = useState(false);
    const [openNewResource, setOpenNewResource] = useState(false);
    const [openDeleteResource, setOpenDeleteResource] = useState(false);
    const [filter, setFilter] = useState('date')
    const [editable, setEditable] = useState(false);
    const [resourceTitle, setResourceTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [titleLabel, setTitleLabel] = useState("Enter title")
    const [searchText, setSearchText] = useState("")

    // Fetch resources.
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
            await api.post('/resource/add', Resource(title));
            fetchResources();
        } catch(err) {
            console.log(err);
        }
    };

    // Create a new resource
    const deleteResource = async title => {
        try {
            await api.post('/resource/delete', { title });
            fetchResources();
        } catch(err) {
            console.log(err);
        }
    }

    const updateResourceViews = async data => {
        try {
            if (login.logged) {
                let viewed = false;
                for (let user of data.views) {
                    if (user === login.email) {
                        viewed = true;
                        break;
                    }
                }
                if (!viewed) {
                    await api.post('/resource/update/views', { id: data._id, email: login.email, views: data.views });
                    fetchResources();
                }
            }
        } catch(err) {
            console.log(err);
        }
    };

    const findResource = (title) => {
        for (const r of resources) {
            if (r.title.toUpperCase() === title.toUpperCase()) {
                return r
            }
        }
        return null;
    }

    const closeResource = () => {
        setResourceId(null);
        setViewResource(false);
        setEditable(false);
    };

    const loadResource = data => {
        updateResourceViews(data)
        setResourceId(data._id);
        setViewResource(true);
    };

    const handleEdit = data => {
        setEditable(true);
        setResourceId(data._id);
        setViewResource(true);
    };

    const handleCloseResource = () => {
        setTitleError(false);
        setTitleLabel("Enter title");
        setOpenNewResource(false);
        setOpenDeleteResource(false);
        setResourceTitle("");
    };
    
    const handleNewResource = () => {
        if (resourceTitle.length > 65) {
            setTitleError(true);
            setTitleLabel("Maximum title length");
        } else {
            setTitleError(false);
            setTitleLabel("Enter title");
            const title = resourceTitle.trim();
            const r = findResource(title);
            if (!r) {
                newResource(title);
                handleCloseResource();
            } else {
                setTitleError(true);
                setTitleLabel("Already exists");
            }
        }
    };
    
    const handleDeleteResource = () => {
        if (resourceTitle.length > 65) {
            setTitleError(true);
            setTitleLabel("Maximum title length");
        } else {
            setTitleError(false);
            setTitleLabel("Enter title");
            const title = resourceTitle.trim();
            const r = findResource(title);
            if (r) {
                deleteResource(title);
                handleCloseResource();
            } else {
                setTitleError(true);
                setTitleLabel("Does not exist");
            }
        }
    };

    const handleOpenNewResource = () => {
        setOpenNewResource(true);
    };
    
    const handleOpenDeleteResource = () => {
        setOpenDeleteResource(true);
    };

    const handleResourceTitleChange = f => {
        setResourceTitle(f.target.value);
    };

    const handleSearchChange = f => {
        setSearchText(f.target.value);
    };

    const handleFilterChange = event => {
        setFilter(event.target.value)
    };

    const sortViews = (a, b) => {
        if (a.views < b.views) {
            return 1;
        }
        if (a.views > b.views) {
            return -1;
        }
        return 0
    };

    const searchFilter = data => {
        if (searchText) {
            for (let i = 0; i < searchText.length; i++) {
                if (data.title[i] !== searchText[i]) {
                    return false;
                }
            }

        }
        return true;
    }

     // Fetch resources on render.
    useEffect(() => {
        fetchResources();
    }, [setResources]);
    
    return (
        <Box className="resource-page">
             <Dialog open={openNewResource}>
                <Box className="resource-cd">
                    Create resource
                    <DialogActions className="resource-new">
                        <TextField label={titleLabel} error={titleError} variant="standard" onChange={handleResourceTitleChange}/>
                        <Box className="resource-new-buttons">
                            <IconButton onClick={handleNewResource}><CheckIcon size="small"/></IconButton>
                            <IconButton onClick={handleCloseResource}><CloseIcon size="small"/></IconButton>
                        </Box>
                    </DialogActions> 
                </Box>
            </Dialog>
             <Dialog open={openDeleteResource}>
                <Box className="resource-cd">
                    Delete resource
                    <DialogActions className="resource-new">
                        <TextField label={titleLabel} error={titleError} variant="standard" onChange={handleResourceTitleChange}/>
                        <IconButton onClick={handleDeleteResource}><CheckIcon size="small"/></IconButton>
                        <IconButton onClick={handleCloseResource}><CloseIcon size="small"/></IconButton>
                    </DialogActions> 
                </Box>
            </Dialog>
                    <Box className="resource-header">
                        <SearchIcon/>
                        <TextField className='resource-search' size='small' variant="outlined" label={ !viewResource ? "Enter title" : null}  onChange={handleSearchChange}></TextField>
                        <FormControl className='resource-filter' size='small'>
                            { !viewResource ? <InputLabel id="filter-select">Filter</InputLabel> : null }
                            <Select
                                labelId="filter-select"
                                value={filter}
                                label="Filter"
                                onChange={handleFilterChange}
                                >
                                <MenuItem value={'date'}>Date</MenuItem>
                                <MenuItem value={'views'}>Views</MenuItem>
                            </Select>
                        </FormControl>
                        { login.admin ? 
                            <Box>
                                <IconButton onClick={handleOpenNewResource}><AddIcon/></IconButton>
                                <IconButton onClick={handleOpenDeleteResource}><RemoveIcon/></IconButton>
                            </Box>
                            : null }
                    </Box>
                <ScrollToBottom mode='top' className='resource-scroll'>
                    <List className="resource-list">
                        {resources.filter(searchFilter).sort(filter === 'views' ? sortViews : sortDate).map((e, i) =>
                            <Box className="resource-item" key={i}>
                                <Box className="resource-title" color="primary" onClick={() => loadResource(e)} >{e.title}<></></Box>
                                <Box className="resource-stats">
                                    { login.admin && !viewResource ? 
                                        <IconButton sx={{ padding: '0px'}} onClick={() => handleEdit(e)}><EditIcon/></IconButton>
                                        : null }
                                    <Box className="resource-view">{e.views.length}<VisibilityIcon/></Box>
                                    <Box className="resource-date">{formatDate(e.date)}</Box>
                                </Box>
                                <Backdrop open={viewResource && resourceId === e._id} className="resource-backdrop">
                                    <ResourceView fetchResources={fetchResources} closeResource={closeResource} editable={editable} resource={e} />
                                </Backdrop>
                            </Box>
                        )}
                    </List>
                </ScrollToBottom>
        </Box> 
    );
};
export default Resources;