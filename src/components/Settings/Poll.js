import React from 'react'
import { Box, Typography, Button } from '@mui/material'
const Poll = () => {
    return (
        <>
            <Box className="poll_section">
                <Box className='poll_section_heading'>
                    <Typography variant="span">Poll History</Typography>
                    <Button variant="filled" sx={{ color: "#2E3591" }} className='bg-white'>+ Create Poll</Button>
                </Box>
                <Box className="poll_question_section">
                    <Box className="poll_question">
                        <Box className="common_row">
                            <Typography variant='span'>Why did you choose our product?</Typography>
                            <Typography variant='span'>21 feb 2021</Typography>
                        </Box>
                    </Box>
                </Box>


            </Box>
        </>
    )
}

export default Poll