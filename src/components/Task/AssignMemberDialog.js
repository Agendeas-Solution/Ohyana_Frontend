import React from 'react'
import {
  Box,
  Typography,
  Button,
  FormControl,
  Dialog,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
const AssignMemberDialog = ({
  handleCloseMemberDialog,
  openMemberDialog,
  handleAssignMember,
  memberList,
  member,
  setMember,
}) => {
  return (
    <>
      <Dialog open={openMemberDialog} onClose={handleCloseMemberDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Assign Member</Typography>
          <FormControl className="dialogue_input_fields">
            <InputLabel>Select Members</InputLabel>
            <Select
              label="Select Members"
              value={member}
              onChange={(e, value) => {
                setMember(e.target.value)
              }}
            >
              {memberList.map(data => {
                return <MenuItem value={data.id}>{data.email}</MenuItem>
              })}
            </Select>
          </FormControl>
          <DialogActions sx={{ marginTop: '15px' }}>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={() => handleAssignMember(member)}
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
