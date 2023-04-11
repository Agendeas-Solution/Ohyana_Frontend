import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  DialogContent,
  Dialog,
  Divider,
} from '@mui/material'
import { GetPJPDetail } from '../../services/apiservices/teamcall'
import './index.css'
import EditPJPDialog from './EditPJPDialog'
const PJPDetailDialog = ({ pjpDetailDialog, handleCloseDialog }) => {
  const [pjpDetail, setPJPDetail] = useState({})
  const [editPJPDetail, setEditPJPDetail] = useState({
    status: false,
  })
  const handleEditPJPCloseDialog = () => {
    setEditPJPDetail({ ...editPJPDetail, status: false })
  }

  const handleEditPJPOpenDialog = () => {
    setEditPJPDetail({ ...editPJPDetail, status: true })
  }
  const handlePJPDetail = () => {
    GetPJPDetail(
      pjpDetailDialog.id,
      res => {
        setPJPDetail(res.data)
      },
      err => {},
    )
  }
  useEffect(() => {
    handlePJPDetail()
  }, [])
  return (
    <>
      <Dialog open={pjpDetailDialog.status} onClose={handleCloseDialog}>
        <div className="px-3 pt-3 common_row">
          <h4>PJP Detail</h4>
          <Box>
            <Button className="common_button" onClick={handleEditPJPOpenDialog}>
              Edit
            </Button>
            <Button onClick={handleCloseDialog} className="common_button">
              Cancel
            </Button>
          </Box>
        </div>
        <Divider />
        <DialogContent>
          <Box className="common_row">
            <Typography variant="span">Customer Name</Typography>
            <Typography>{pjpDetail?.client?.name || '-'}</Typography>
          </Box>
          <Box className="common_row">
            <Typography variant="span">Business</Typography>
            <Typography>{pjpDetail?.client?.business || '-'}</Typography>
          </Box>
          <Box className="common_row">
            <Typography variant="span">Contact</Typography>
            <Typography>{pjpDetail?.client?.contact_number || '-'}</Typography>
          </Box>
          <Box className="common_row">
            <Typography variant="span">City</Typography>
            <Typography>{pjpDetail?.client?.city || '-'}</Typography>
          </Box>
          <Box className="common_row">
            <Typography variant="span">Date</Typography>
            <Typography>{pjpDetail?.date || '-'}</Typography>
          </Box>
          <Box className="common_row">
            <Typography variant="span">Description</Typography>
            <Typography variant="span">
              {pjpDetail?.description || '-'}
            </Typography>
          </Box>
          <Box className="common_row">
            <Typography variant="span">Finish Description</Typography>
            <Typography variant="span">
              {pjpDetail?.finish_description || '-'}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
      {pjpDetail.status && (
        <EditPJPDialog
          editPJPDetail={editPJPDetail}
          setEditPJPDetail={setEditPJPDetail}
          handleEditPJPCloseDialog={handleEditPJPCloseDialog}
          pjpDetail={pjpDetail}
          handlePJPDetail={handlePJPDetail}
        />
      )}
    </>
  )
}

export default PJPDetailDialog
