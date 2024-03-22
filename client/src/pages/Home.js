import { Box, Button, Backdrop } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import VisibilityIcon from '@mui/icons-material/Visibility';
import ResourceView from '../editors/ResourceView';
import "./Home.css";
import './Resources'

const Home = ({ setTabValue, resource, formatDate }) => {
    const [viewResource, setViewResource] = useState(false);
    const navigate = useNavigate();

    const handleResourceButton = () => {
        setTabValue('/resources');
        navigate('/resources')
    };
    
    const handleForumButton = () => {
        setTabValue('/forums');
        navigate('/forums')
    };

    const handleContactButton = () => {
        setTabValue('/contact');
        navigate('/contact')
    };

    const handleLoadResource = () => {
        setViewResource(true);
    };
    
    const handleCloseResource = () => {
        setViewResource(false);
    };
    
    return (
        <Box className="home-page">
            <Box className="entrenet-header">Welcome to EntreNet.</Box>
            <Box className="entrenet-home">
                <Box className="home-text">Empowering dreams, fostering growth – EntreNet envisions a world where every entrepreneur has the tools, community, and opportunities to transform their vision into a thriving reality.</Box>
                <Box className="home-divider"/>
                <Box className="home-text">Most recently published resource.</Box>
                <Box className="home-resource">
                    { resource ?
                        <Box className="resource-item">
                            <Box className="resource-title" onClick={handleLoadResource} color="primary" >{resource.title}</Box>
                            <Box className="resource-stats">
                                <Box className="resource-view">{resource.views.length}<VisibilityIcon/></Box>
                                <Box className="resource-date">{formatDate(resource.date)}</Box>
                            </Box>
                            <Backdrop open={viewResource} className="resource-backdrop">
                                <ResourceView closeResource={handleCloseResource} editable={false} resource={resource} />
                            </Backdrop>
                        </Box>
                    : null }
                </Box>
                { !viewResource ? <Button variant='contained' onClick={handleResourceButton}>Resource Hub</Button> : null }
                <Box className="home-divider"/>
                <Box className="home-text">Most popular forum discussion.</Box>
                { !viewResource ? <Button variant='contained' onClick={handleForumButton}>Forums page</Button> : null }
                <Box className="home-divider"/>
                <Box className="home-text">Reach out to the EntreNet team.</Box>
                { !viewResource ? <Button variant='contained' onClick={handleContactButton}>Contact US</Button> : null }
            </Box>
        </Box>
    );
};

export default Home;