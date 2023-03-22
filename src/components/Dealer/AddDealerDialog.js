import React from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
} from '@mui/material'

const AddDealerDialog = ({
  addDealer,
  setAddDealer,
  handleCloseDialog,
  AddDealerDetail,
}) => {
  return (
    <>
      <Dialog open={addDealer.status} onClose={handleCloseDialog}>
        <div className="px-3 pt-3 text-center">
          <h2>Add Dealer</h2>
        </div>
        <DialogContent>
          <div className="row">
            <div className="col-md-12">
              <Typography variant="span">Dealer Id</Typography>
            </div>
            <div className="col-md-12">
              <TextField
                className="w-100"
                value={addDealer.dealerId}
                onChange={e => {
                  setAddDealer({ ...addDealer, dealerId: e.target.value })
                }}
                type="text"
                variant="outlined"
                placeholder="Dealer Id"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions
          sx={{ marginLeft: '13px', marginRight: '13px' }}
          className="mt-1 d-flex justify-content-between"
        >
          <Button
            variant="contained"
            className="ok-btn"
            onClick={AddDealerDetail}
          >
            Ok
          </Button>
          <Button onClick={handleCloseDialog} className="cancel-btn" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddDealerDialog
