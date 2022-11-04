import React from 'react'
import { Box, Typography,Paper } from '@mui/material'
import './index.css';
import UserIcon from '../../assets/img/userprofile.svg'
import CompanyIcon from '../../assets/img/companyIcon.svg'
import CallIcon from '../../assets/img/call.svg'
import LocationIcon from '../../assets/img/location.svg'

const BusinessCard = () => {
    return (
        <>
            <Box className="business_card_section" >
                <Box className="business_card">
                    <Box className="business_card_left_section">
                        <img src={UserIcon} />
                        <img src={CompanyIcon} />
                        <img src={CallIcon} />
                        <img src={LocationIcon} />
                    </Box>
                    <Box className="business_card_right_section">
                        <Typography variant="span"> Natasha Kirovska</Typography>
                        <Typography variant="span"> Natasha Kirovska</Typography>
                        <Typography variant="span"> Natasha Kirovska</Typography>
                        <Typography variant="span"> Natasha Kirovska</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default BusinessCard