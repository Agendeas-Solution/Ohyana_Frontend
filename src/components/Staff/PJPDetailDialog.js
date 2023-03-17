import React, { useEffect, useState } from 'react'
import {Box, Typography, Button, DialogContent, Dialog, Divider} from "@mui/material";
import { GetPJPDetail } from '../../services/apiservices/teamcall';
import './index.css';
const PJPDetailDialog = ({ pjpDetailDialog, handleCloseDialog }) => {
  const [pjpDetail, setPJPDetail] = useState([]);
  useEffect(() => {
    GetPJPDetail(pjpDetailDialog.id, (res) => {
      setPJPDetail(res.data);
    }, (Err) => {

    })
  }, [])
  return (
    <>
      <Dialog
        open={pjpDetailDialog.status}
        onClose={handleCloseDialog}
      >
        <div className="px-3 pt-3 common_row">
          <h4>PJP Detail</h4>
          <Box>
            <Button className="common_button">Edit</Button>
            <Button onClick={handleCloseDialog} className="common_button">Cancel</Button>
          </Box>
        </div>
        <Divider />
        <DialogContent>
          <Box className='common_row'>
            <Typography variant="span">Customer Name</Typography>
            <Typography>{pjpDetail?.name}</Typography>
          </Box>
          <Box className='common_row'>
            <Typography variant="span">Business</Typography>
            <Typography>{pjpDetail?.business}</Typography>
          </Box>
          <Box className='common_row'>
            <Typography variant="span">Contact</Typography>
            <Typography>{pjpDetail?.contact_number}</Typography>
          </Box>
          <Box className='common_row'>
            <Typography variant="span">City</Typography>
            <Typography>{pjpDetail?.city}</Typography>
          </Box>
          <Box className='common_row'>
            <Typography variant="span">Date</Typography>
            <Typography>{pjpDetail?.date}</Typography>
          </Box>
          <Box className="common_row">
            <Typography variant="span">Description</Typography>
            <Typography variant="span">{pjpDetail?.description}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PJPDetailDialog