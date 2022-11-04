import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import './index.css';
const NoDataFound = () => {
    return (
        <Box className='no_data_found_root'>
            <Box className="back_to_search_button">
                <Typography className="oops_root" variant="span">OOPS!</Typography>
                <Typography className="no_data_available_tagline" variant="span">isNotNull(props.title) == true ? props.title : str_no_data_found</Typography>
                {/* <Button onClick={() => {
                history.push('/search/newSearch');
              }} style={{ height: "35px", background: "#2b3c55", borderRadius: "5px", color: "#fff",fontSize:"15px" }}>Back to search
          </Button> */}
            </Box>
        </Box>
    )
}



export default NoDataFound;
