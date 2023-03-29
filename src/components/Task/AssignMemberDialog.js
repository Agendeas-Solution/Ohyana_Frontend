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
}) => {
  console.log(memberList)
  const [member, setMember] = useState({})
  return (
    <>
      <Dialog open={openMemberDialog} onClose={handleCloseMemberDialog}>
        <DialogTitle
          sx={{ fontWeight: '800' }}
          className="row justify-content-left font-weight-bold"
        >
          Members
        </DialogTitle>
        <Box className="my-3 mx-3 p-2">
          <div className="row">
            <div className="col-md-12">
              <Autocomplete
                options={memberList}
                getOptionLabel={memberList => memberList?.email}
                value={member?.email}
                onChange={(e, value) => {
                  console.log(value)
                  setMember(value)
                }}
                sx={{
                  width: 300,
                  border: '1px solid #E5E5E5',
                  borderRadius: '5px',
                }}
                renderInput={params => (
                  <TextField {...params} placeholder="Search Members" />
                )}
              />
            </div>
          </div>
        </Box>
        {/* <DialogActions className="m-auto">
          <Button
            variant="contained"
            onClick={() => handleAssignMember(member.id)}
          >
            Ok
          </Button>
          <Button
            className="cancel-btn"
            autoFocus
            onClick={handleCloseMemberDialog}
          >
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  )
}

export default AssignMemberDialog
