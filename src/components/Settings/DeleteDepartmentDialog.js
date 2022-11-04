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
import { DeleteDepartment } from "../../services/apiservices/staffDetail";
import { useNavigate } from "react-router-dom";
import { Context as  ContextSnackbar } from "../../context/pageContext";
const DeleteDepartmentDialog = (props) => {
  const { successSnackbar } = useContext( ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext( ContextSnackbar);
  const navigate = useNavigate();
  const handleDeleteDepartment = () => {
    DeleteDepartment(props.deleteDepartmentDialogControl.id, (res) => {
      navigate("/departmentlist");
      setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
    }, (err) => {
      //debugger;

    })
  }
  return (
    <>
      <Dialog
        open={props.deleteDepartmentDialogControl.status}
        onClose={props.handleClose}
      >
        <DialogTitle>
          <DeleteRoundedIcon className="edit_icon_profile" />
        </DialogTitle>
        <DialogContent>
          <Typography variant="span">
            Are You Sure you want to delete this Department ?
          </Typography>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button variant="contained" onClick={handleDeleteDepartment}>
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

export default DeleteDepartmentDialog;
