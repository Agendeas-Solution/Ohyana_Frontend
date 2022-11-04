import React, { useContext } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { DeleteAdminProduct } from "../../services/apiservices/adminprofile";
import SuccessSnackbar from "../SuccessSnackbar/SuccessSnackbar";
import { Context as  ContextSnackbar } from "../../context/pageContext";
const DeleteProductDialog = (props) => {
  const { successSnackbar } = useContext( ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext( ContextSnackbar);
  const handleDelete = (id) => {
    DeleteAdminProduct(
      id,
      (res) => {
        if (res.status === 200) {
          props.handleClose();
          //debugger
          setSuccessSnackbar({ ...successSnackbar, status: true, message: `${props.DeleteProductDialogControl.type.charAt(0) + props.DeleteProductDialogControl.type.toLowerCase().slice(1)} Deleted Successfully` });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <>
      <Dialog
        open={props.DeleteProductDialogControl.status}
        onClose={props.handleClose}
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography variant="span">
            Are You Sure you want to Delete this Product ?
          </Typography>
        </DialogContent>
        <DialogActions className="m-auto">
          <Button
            variant="contained"
            onClick={() => handleDelete(props.DeleteProductDialogControl.id)}
          >
            Ok
          </Button>
          <Button
            className="cancel-btn"
            onClick={props.handleClose}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteProductDialog;
