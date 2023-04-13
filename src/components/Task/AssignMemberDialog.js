import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Paper,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material'
const AssignMemberDialog = ({
  handleCloseMemberDialog,
  openMemberDialog,
  handleAssignMember,
  memberList,
  member,
  setMember,
}) => {
  console.log(memberList)
  return (
    <>
      <Dialog open={openMemberDialog} onClose={handleCloseMemberDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Assign Mmber</Typography>
          <Autocomplete
            disablePortal
            options={memberList}
            value={member?.email}
            onChange={(e, value) => {
              console.log(value)
              setMember(value)
            }}
            getOptionLabel={memberList => memberList?.email}
            renderInput={params => (
              <TextField
                {...params}
                className="dialogue_input_fields"
                label="Select Members"
                placeholder="Search Members"
              />
            )}
          />
          <DialogActions sx={{ marginTop: '15px' }}>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={() => handleAssignMember(member.id)}
            >
              Ok
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleCloseMemberDialog}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default AssignMemberDialog
