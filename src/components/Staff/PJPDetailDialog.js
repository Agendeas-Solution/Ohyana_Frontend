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
import moment from 'moment'

const PJPDetailDialog = ({
  pjpDetailDialog,
  handleCloseDialog,
  addPJPDetail,
  setAddPJPDetail,
}) => {
  const [pjpDetail, setPJPDetail] = useState({
    id: '',
    date: moment().format('LL'),
    description: '',
  })
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
        <Box className="pjp_dialogue_main_section">
          <Box className="pjp_detail_header">
            <Box sx={{ paddingLeft: '26px' }} variant="span">
              <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
                PJP Detail
              </Typography>
            </Box>
            <Box sx={{ padding: '15px 20px' }} variant="span">
              <Button
                className="common_button"
                onClick={() => {
                  setAddPJPDetail({
                    ...addPJPDetail,
                    clientId: pjpDetail.client,
                    date: pjpDetail.date,
                    description: pjpDetail.description,
                    dialogStatus: true,
                    pjpId: pjpDetail.id,
                  })
                }}
              >
                Edit
              </Button>
              <Button onClick={handleCloseDialog} className="common_button">
                Cancel
              </Button>
            </Box>
          </Box>

          <Divider sx={{ border: '1px solid #C4C4C4', width: '90%' }} />

          <DialogContent sx={{ width: '100%' }}>
            <Box className="companyDetail_root p-2">
              <Typography className="profile_data_lable" variant="span">
                Customer Name
              </Typography>
              <Typography variant="span">
                {pjpDetail?.client?.name || '-'}
              </Typography>
            </Box>
            <Box className="companyDetail_root p-2">
              <Typography className="profile_data_lable" variant="span">
                Business
              </Typography>
              <Typography variant="span">
                {pjpDetail?.client?.business || '-'}
              </Typography>
            </Box>
            <Box className="companyDetail_root p-2">
              <Typography className="profile_data_lable" variant="span">
                Contact
              </Typography>
              <Typography variant="span">
                {pjpDetail?.client?.contact_number || '-'}
              </Typography>
            </Box>
            <Box className="companyDetail_root  p-2">
              <Typography className="profile_data_lable" variant="span">
                City
              </Typography>
              <Typography variant="span">{pjpDetail?.city || '-'}</Typography>
            </Box>
            <Box className="companyDetail_root  p-2">
              <Typography className="profile_data_lable" variant="span">
                State
              </Typography>
              <Typography variant="span">{pjpDetail?.state || '-'}</Typography>
            </Box>
            <Box className="companyDetail_root  p-2">
              <Typography className="profile_data_lable" variant="span">
                Date
              </Typography>
              <Typography variant="span">{pjpDetail?.date || '-'}</Typography>
            </Box>
            <Box className="companyDetail_root p-2">
              <Typography className="profile_data_lable" variant="span">
                Description
              </Typography>
              <Typography variant="span">
                {pjpDetail?.description || '-'}
              </Typography>
            </Box>
            <Box className="companyDetail_root  p-2">
              <Typography className="profile_data_lable" variant="span">
                Finish Description
              </Typography>
              <Typography variant="span">
                {pjpDetail?.finish_description || '-'}
              </Typography>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
      {/* {pjpDetail.status && (
        <EditPJPDialog
          editPJPDetail={editPJPDetail}
          setEditPJPDetail={setEditPJPDetail}
          handleEditPJPCloseDialog={handleEditPJPCloseDialog}
          pjpDetail={pjpDetail}
          handlePJPDetail={handlePJPDetail}
        />
      )} */}
    </>
  )
}

export default PJPDetailDialog
