import React, { useContext } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material'
const AddEditRegularHolidayDialog = ({
  addEditRegularDetail,
  setAddEditRegularDetail,
  daysList,
  handleAddEditRegularDialogClose,
  handleAddRegularHoliday,
  handleUpdateRegularHoliday,
}) => {
  return (
    <>
      <Dialog
        open={addEditRegularDetail.status}
        onClose={handleAddEditRegularDialogClose}
      >
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Regular Holiday</Typography>
          <FormControl className="dialogue_input_fields">
            <InputLabel>Select Regular Holiday</InputLabel>
            <Select
              label="Select Regular Holiday"
              value={addEditRegularDetail?.occasion}
              onChange={e => {
                setAddEditRegularDetail({
                  ...addEditRegularDetail,
                  occasion: e.target.value,
                })
              }}
            >
              {daysList &&
                daysList.map(data => {
                  return <MenuItem value={data?.id}>{data?.days}</MenuItem>
                })}
            </Select>
          </FormControl>
          <DialogActions className="m-auto">
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={
                addEditRegularDetail?.id
                  ? handleUpdateRegularHoliday
                  : handleAddRegularHoliday
              }
            >
              Add
            </Button>
            <Button
              className="dialogue_button_nagative"
              onClick={handleAddEditRegularDialogClose}
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default AddEditRegularHolidayDialog
