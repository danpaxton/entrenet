import { Box, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./Resources.css"


const Resources = (props) => {
    const { resources } = props;

    return (
        <Box className="resource-page">
            <List>
            {resources.map((e, i) =>
                <ListItem>
                    {e.title + "\n" + e.desc}
                </ListItem>
            )}
            </List>
        </Box>
    );
};

export default Resources;