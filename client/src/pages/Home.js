import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box className="home-page">
            <Box className="entrenet-header">Welcome to EntreNet.</Box>
            <Box className="vision-text">Empowering dreams, fostering growth – EntreNet envisions a world where every entrepreneur has the tools, community, and opportunities to transform their vision into a thriving reality.</Box>
            <Box className="resource-button" onClick={() => navigate('/resources')}>Visit Resource Hub</Box>
            <Box className="slide-item"></Box>
            <Box className="slide-item"></Box>
        </Box>
    );
};

export default Home;