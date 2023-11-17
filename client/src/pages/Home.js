import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box className="home-page">
            <Box className="entrenet-header">Welcome to EntreNet.</Box>
            <Box className="vision-text">&emsp;EntreNet is a dynamic organization committed to bridging the gap between aspiring entrepreneurs and the resources they need to thrive in the ever-evolving world of business. Our mission is to empower entrepreneurs with the knowledge, mentorship, and networking opportunities necessary for their success. Our ultimate goal is to become the go-to platform for entrepreneurs across the world. Through our virtual events, mentorship programs, and connections to top investors, we aim to equip the next generation of business leaders with the skills and experiences they need to excel in the entrepreneurial landscape.</Box>
            <Box className="resource-button" onClick={() => navigate('/resources')}>Visit Resource Hub</Box>
            <Box className="slide-item"></Box>
            <Box className="slide-item"></Box>
        </Box>
    );
};

export default Home;