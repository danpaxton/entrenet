import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import "./Home.css";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 2500;

const Home = () => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  
    useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () => setIndex((prevIndex) => (prevIndex + 1) % colors.length), delay
      );
  
      return () => {
        resetTimeout();
      };
    }, [index]);
  

    return (
        <Box className="home-page">
            <Box className="entrenet-header">EntreNet</Box>
            <Box className="vision-text">
                The platform aims to serve as a central hub where entrepreneurs can learn, connect, access
                resources, and secure funding to turn their entrepreneurial visions into successful ventures.
            </Box>
            <Box className="slideshow">
                <Box className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                    {colors.map((backgroundColor, index) => (
                    <Box className="slide" key={index} style={{ backgroundColor }}></Box>
                    ))}
                </Box>
                <Box className="slideshowDots">
                    {colors.map((_, idx) => (
                    <Box key={idx} className={`slideshowDot${index === idx ? " active" : ""}`} 
                        onClick={() => { setIndex(idx); }}></Box>))}
                </Box>
            </Box>
        </Box>
    );
};
 
export default Home;