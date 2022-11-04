import React, { useState } from "react";
import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  TextField,TextareaAutosize
} from "@mui/material";
import Department from "./Department";
import { CreateJobRole } from "../../services/apiservices/adminprofile";
const JobRoleDialog = (props) => {
  console.log(props?.jobRoleList?.departmentId);

  const [jobRoleDetail, setJobRoleDetail] = useState({
    name: "",
    description: "",
    departmentId: props?.jobRoleList?.departmentId,
  });
  const [flagJobRole, setFlagJobRole] = useState(true);
  const addJobRole = () => {
    CreateJobRole(
      jobRoleDetail,
      (res) => {
        props.handleClose();
      },
      (err) => {
        //
      }
    );
  };
  return (
    <>
      <Dialog open={props.jobRoleDialogControl} onClose={props.handleClose}>
        <DialogTitle>Job Role</DialogTitle>
        <DialogContent>
          <Box>
            <div className="row">
              <div className="col-md-12">
                <Typography variant="span">Job Role<span className="required_star">*</span></Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  className="w-100"
                  value={jobRoleDetail.name}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setJobRoleDetail({
                        ...jobRoleDetail,
                        name: e.target.value,
                        departmentId: props?.jobRoleList?.departmentId,
                      });
                      setFlagJobRole(false);
                    } else {
                      setFlagJobRole(true);
                    }
                  }}
                  type="text"
                  variant="outlined"
                  placeholder="Job Role"
                />
              </div>
            </div>
          </Box>
          <Box>
            <div className="row my-4">
              <div className="col-md-6">
                <Typography variant="span">Description<span className="required_star">*</span></Typography>
              </div>
              <div className="col-md-12">
               
                <TextareaAutosize
                  style={{ width: 150 }}
                  placeholder="Description Here..."
                  className="w-100"
                  value={jobRoleDetail.description}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setJobRoleDetail({
                        ...jobRoleDetail,
                        description: e.target.value,
                        departmentId: props?.jobRoleList?.departmentId,
                      });
                      setFlagJobRole(false);
                    } else {
                      setFlagJobRole(true);
                    }
                  }}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button
            disabled={flagJobRole}
            variant="contained"
            onClick={
              addJobRole
            }
          >
            Ok
          </Button>
          <Button className="cancel-btn" onClick={props.handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobRoleDialog;
