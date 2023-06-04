import React, { useState } from 'react'
import { Box } from '@mui/material'
import './index.css'
import ViewBusinessCardDetail from './ViewBusinessCardDetail'
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
