import { textAlign } from '@mui/system';
import React, { useState } from 'react';
 

const Forum = () => ({ text: "", views: 0, likes: 0, date: "" });

const Forums = () => {
    const [forums, setForums] = useState([]);

    const addForum = () => {
        // TODO add new fourm to forums list.
    }

    return (
        <div>
            <h1>Forums</h1>
            {forums.map((e, i) => {
                <Box key={i}>
                    {e}
                </Box>
            })}
        </div>
    );
};
 
export default Forums;