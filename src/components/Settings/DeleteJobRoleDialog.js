import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { DeleteJobRole } from "../../services/apiservices/staffDetail";
import { Context as  ContextSnackbar } from "../../context/pageContext";
const DeleteJobRoleDialog = (props) => {
  const { successSnackbar } = useContext( ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext( ContextSnackbar);
  const handleJobRoleDelete = () => {
    DeleteJobRole(props.deleteJobRoleDialogControl.id, (res) => {
      setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message})
      props.handleClose();
    }, (err) => {
      //debugger;
    })
  }
  return (
    <>
      <Dialog
        open={props.deleteJobRoleDialogControl.status}
        onClose={props.handleClose}
      >
        <DialogTitle>
          <DeleteRoundedIcon className="edit_icon_profile" />
        </DialogTitle>
        <DialogContent>
          <Typography variant="span">
            Are You Sure you want to delete this Job Role ?
          </Typography>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button variant="contained" onClick={handleJobRoleDelete}>
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

export default DeleteJobRoleDialog;
