import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import Like from '../../assets/img/like.svg'
import './index.css';
const Complaint = () => {
    return (
        <>
            <Box className="main_section">
                <Box className="complaint_section">
                    <Box className="complaint_left_section">
                        <Box className="ticket_detail">
                            <Box className="ticket_number_row">
                                <Box className="row">
                                    <Typography className="ticket_sub_heading" variant="span">Ticket Number</Typography>
                                    <Typography variant="span">#CO157893</Typography>
                                </Box>
                                <Button className="close_ticket_button">Close Ticket</Button>
                            </Box>
                            <Box className="row">
                                <Typography className="ticket_sub_heading" variant="span">Date</Typography>
                                <Typography variant="span">10:25 Am</Typography>
                            </Box>
                            <Box className="row">
                                <Typography className="ticket_sub_heading" variant="span">Status</Typography>
                                <Typography variant="span">Open</Typography>
                            </Box>
                            <Box className="row">
                                <Typography className="ticket_sub_heading" variant="span">About</Typography>
                                <Typography variant="span">Payment</Typography>
                            </Box>
                            <Box className="row">
                                <Typography className="ticket_sub_heading" variant="span">Description</Typography>
                                <Typography variant="span">Lorem ipsum is a placeholder text commonly used
                                    to demonstrate the visual form of a document or a
                                    typeface without relying on meaningful content.</Typography>
                            </Box>
                        </Box>
                        <Box className="customer_feedback_section">
                            <Box className="customer_feedback_heading">
                                <Typography sx={{ margin: "auto 0", fontWeight: 600 }} variant="span">Customer Feedback</Typography>
                                <Button className="common_button"><img src={Like} alt="" /></Button>
                            </Box>
                            <Typography variant="span">Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</Typography>
                        </Box>
                    </Box>
                    <Box className="complaint_right_section">
                        <Box className="customer_feedback_section">
                            <Box className="customer_feedback_heading">
                                <Typography sx={{ margin: "auto 0", fontWeight: 600 }} variant="span">Resolve Ticket </Typography>
                                <Button className="common_button">Add Status</Button>
                            </Box>
                        </Box>
                        <Typography variant="span">Updates</Typography>
                        <Box className="complaint_updates">
                            <Box className="date_cell">
                                <Typography variant="span">5</Typography>
                                <Typography variant="span">Sep</Typography>
                            </Box>
                            <Box className="complain_updates_description">
                                <Typography variant="span">
                                    Lorem ipsum is a placeholder text commonly used to
                                    demonstrate the visual form of a document or a
                                    typeface without relying on meaningful content.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Complaint