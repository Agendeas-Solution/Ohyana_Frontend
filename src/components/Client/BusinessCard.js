import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import './index.css'
import UserIcon from '../../assets/img/userprofile.svg'
import CompanyIcon from '../../assets/img/companyIcon.svg'
import CallIcon from '../../assets/img/call.svg'
import LocationIcon from '../../assets/img/location.svg'
import { AxiosInstance } from 'axios'
import ViewBusinessCardDetail from './ViewBusinessCardDetail'
import NoResult from '../../assets/img/no_result.svg'
import NoResultWithText from '../../assets/img/no_result_with_text.svg'
import NoResultFound from '../ErrorComponent/NoResultFound'

const BusinessCard = ({ clientDetails }) => {
  const [viewBusinessCardDialog, setViewBusinessCardDialog] = useState({
    status: false,
  })
  const handleDialogClose = () => {
    setViewBusinessCardDialog({ ...viewBusinessCardDialog, status: false })
  }
  return (
    <>
      <Box className="business_card_section">
        {clientDetails.length > 0 ? (
          clientDetails.map(data => {
            let Image_Link = `${process.env.REACT_APP_API_CALL_URL}/file/${data?.imageUrl}`
            return (
              <Box
                className="business_card"
                onClick={() =>
                  setViewBusinessCardDialog({
                    ...viewBusinessCardDialog,
                    status: true,
                    id: data?.id,
                  })
                }
              >
                <img
                  style={{ borderRadius: '10px' }}
                  src={data.imageUrl}
                  alt=""
                />
                {/* <Box className="business_card_left_section">
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
                        </Box> */}
              </Box>
            )
          })
        ) : (
          <NoResultFound />
        )}
      </Box>
      <ViewBusinessCardDetail
        handleDialogClose={handleDialogClose}
        viewBusinessCardDialog={viewBusinessCardDialog}
      />
    </>
  )
}

export default BusinessCard
