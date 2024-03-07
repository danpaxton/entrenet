import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = ({ setTabValue }) => {
    const navigate = useNavigate();

    const handleResourceButton = () => {
        setTabValue('/resources');
        navigate('/resources')
    }
    return (
        <Box className="home-page">
            <Box className="entrenet-header">Welcome to EntreNet.</Box>
            <Box className="vision-text">Empowering dreams, fostering growth – EntreNet envisions a world where every entrepreneur has the tools, community, and opportunities to transform their vision into a thriving reality.</Box>
            <Button variant='contained' onClick={handleResourceButton}>Resource Hub</Button>
            <Box className="slide-item"></Box>
            <Box className="slide-item"></Box>
        </Box>
    );
};

export default Home;