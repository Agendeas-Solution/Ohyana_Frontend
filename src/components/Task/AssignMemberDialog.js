import React, { useState } from 'react'
import { Box, Typography, Button, TextField, FormControl, Paper, Autocomplete, Dialog, DialogActions, DialogTitle } from "@mui/material";

const AssignMemberDialog = ({ handleCloseMemberDialog, openMemberDialog, handleAssignMember, memberList }) => {
    console.log(memberList);
    const [member, setMember] = useState({});
    return (
        <>
            <Dialog
                open={openMemberDialog}
                onClose={handleCloseMemberDialog}
            >
                <DialogTitle className="row justify-content-center font-weight-bold">
                    Members
                </DialogTitle>
                <Box className="my-3">
                    <div className="row">
                        <div className="col-md-12">
                            {/* <TextField
                                className="w-100"
                                placeholder="Task Name"
                                variant="outlined"
                                value={createTask.title}
                                onChange={(e) => {
                                    setCreateTask({ ...createTask, title: e.target.value })
                                }}
                            /> */}
                            <Autocomplete
                                options={memberList}
                                getOptionLabel={(memberList) => memberList?.email}
                                value={member?.email}
                                onChange={(e, value) => {
                                    console.log(value);
                                    setMember(value);
                                    debugger;
                                }}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} placeholder="Search Members" />}
                            />
                        </div>
                    </div>
                </Box>
                <DialogActions className="m-auto">
                    <Button
                        variant="contained"
                        onClick={() =>
                            handleAssignMember(member.id)
                        }
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
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AssignMemberDialog