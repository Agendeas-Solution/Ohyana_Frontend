import React, { useState } from 'react'
import { Typography, Box, Tabs, Button, Tab, Divider } from '@mui/material'
import './index.css'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
const Premium = () => {
  const [value, setValue] = useState('one')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <Box className="w-100 mt-4 profile_section">
        <Box className="current_premium_section mb-2">
          <Typography variant="span" className="p-3">
            Current Premium
          </Typography>
          <Box className="current_premium_plan">
            <Box className="plan_info p-3">
              <Box className="plan_terms pb-3">
                <Typography className="terms_heading" variant="span">
                  Premium Type
                </Typography>
                <Typography variant="span">Foundation - Free Trial</Typography>
              </Box>
              <Box className="plan_terms pb-3">
                <Typography className="terms_heading" variant="span">
                  Price
                </Typography>
                <Typography variant="span">₹0</Typography>
              </Box>
              <Box className="plan_terms pb-3">
                <Typography className="terms_heading" variant="span">
                  Invoice
                </Typography>
                <Typography variant="span">Print</Typography>
              </Box>
            </Box>

            <Divider
              sx={{ borderColor: '#8E8E8E' }}
              orientation="vertical"
              variant="middle"
              flexItem
            />

            <Box className="plan_info">
              <Box className="plan_terms ">
                <Typography className="terms_heading" variant="span">
                  Expires On
                </Typography>
                <Typography variant="span">18 aug 2022</Typography>
              </Box>
              <Box className="plan_terms  mb-5">
                <Typography className="terms_heading" variant="span">
                  Buy Additional Inquiry
                </Typography>
                <Typography variant="span">Buy</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="plan_heading">
          <Box className="plan_title mb-1">
            <Typography
              className="mb-2"
              sx={{ fontSize: '24px', fontWeight: '600' }}
              variant="span"
            >
              Simple, transparent pricing
            </Typography>
            <Typography
              sx={{ color: '#8E8E8E', fontSize: '15px' }}
              variant="span"
            >
              No contracts, No surprise fees
            </Typography>
          </Box>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab value="one" label="3 Mo" />
              <Tab value="two" label="6 Mo" />
              <Tab value="three" label="Yearly" />
            </Tabs>
          </Box>
        </Box>

        <Box className="row premium_plan m-1">
          <Box className="access_control_box px-3 pe-3 mb-2">
            <Box className="plan_pricing_name p-2">
              <Typography
                sx={{ fontSize: '18px', fontWeight: '600' }}
                variant="span"
              >
                Foundation
              </Typography>
              <Typography sx={{ fontSize: '20px' }} variant="span">
                ₹24,999
              </Typography>
            </Box>
            <Typography className="plan_card_description p-2" variant="span">
              For companies that are just getting started with automation.
            </Typography>
            <Button
              sx={{ marginBottom: '18px', fontSize: '20px' }}
              className="common_button"
              variant="contained"
            >
              Choose Plan
            </Button>
            <Divider
              sx={{
                marginBottom: '10px',
                borderColor: '#8E8E8E',
                margin: '2 auto',
              }}
            />
            <Typography
              sx={{ paddingBottom: '13px' }}
              variant="span"
              className="plan_pricing_name"
            >
              Essential automation features
            </Typography>
            <Typography
              sx={{ paddingBottom: '12px' }}
              className="plan_card_sub_heading"
              variant="span"
            >
              CLIENTS ADD-ONS{' '}
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Upto 10,000 clients Inquiry(₹1 per additional Inquiry).
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Inquiry’s status tracking.
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Custom reminder and appoinment.
            </Typography>
            <Typography sx={{ paddingBottom: '15px' }} variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Advance notifications.
            </Typography>
            <Typography
              sx={{ paddingBottom: '12px' }}
              className="plan_card_sub_heading"
              variant="span"
            >
              CORE HR
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Upto 5 team members.
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Manage hierarchy Employe role.
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Attendance management.
            </Typography>
          </Box>

          <Box className="access_control_box  px-3 pe-3  mb-2">
            <Box className="plan_pricing_name p-2">
              <Typography
                sx={{ fontSize: '18px', fontWeight: '600' }}
                variant="span"
              >
                Strength
              </Typography>
              <Typography sx={{ fontSize: '20px' }} nvariant="span">
                ₹32,999
              </Typography>
            </Box>
            <Typography className="plan_card_description p-2" variant="span">
              Scaling with advanced automation & employee engagement.
            </Typography>
            <Button
              sx={{ marginBottom: '18px', fontSize: '20px' }}
              className="common_button"
              variant="contained"
            >
              Choose Plan
            </Button>
            <Divider
              sx={{
                marginBottom: '10px',
                borderColor: '#8E8E8E',
                margin: '2 auto',
              }}
            />
            <Typography
              className="plan_pricing_name main_heading"
              variant="span"
            >
              All Foundation features plus:
            </Typography>
            <Typography
              className="plan_card_sub_heading main_sub_heading"
              variant="span"
            >
              CLIENTS ADD-ONS{' '}
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Upto 16,000 clients Inquiry(₹1 per additional Inquiry).
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Inquiry’s status tracking.
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Custom reminder and appoinment.
            </Typography>
            <Typography sx={{ paddingBottom: '15px' }} variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Advance notifications.
            </Typography>
            <Typography
              className="plan_card_sub_heading main_sub_heading"
              variant="span"
            >
              CORE HR
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Upto 5 team members.
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Manage hierarchy Employe role.
            </Typography>
            <Typography className="sub_heading_points" variant="span">
              <CheckCircleRoundedIcon className="check_circle_icon" />
              Attendance management.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Premium
