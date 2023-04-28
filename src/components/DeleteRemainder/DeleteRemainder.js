import React from 'react'
import { Dialog, DialogActions, Button, Box, Typography } from '@mui/material'
import DeleteIcon from '../../assets/img/delete.png'
import './index.css'
const DeleteRemainder = ({ deleteRemainderDialog, CloseDeleteRemainder }) => {
  return (
    <>
      <Dialog open={deleteRemainderDialog} onClose={CloseDeleteRemainder}>
        <Box className="delete_remainder_dialog">
          <Box className="delete_remainder_content">
            <img src={DeleteIcon} alt="deleteicon" />
            <Typography variant="h5">Delete Remainder</Typography>
            <Typography variant="span">
              Are you sure to delete this Remainder?
            </Typography>
          </Box>
          <DialogActions>
            <Button
              sx={{
                margin: '0 auto',
                background: '#2E3591',
                width: '150px',
                textTransform: 'capitalize',
              }}
              variant="contained"
              onClick={CloseDeleteRemainder}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default DeleteRemainder
