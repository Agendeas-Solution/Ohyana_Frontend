import React, { useState, useContext } from "react";
import {
  Dialog,
  Box,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import {
  AddAdminProduct,
  EditAdminProduct,
} from "../../services/apiservices/adminprofile";
import { Context as ContextSnackbar } from "../../context/pageContext";
const AddProductDialog = (props) => {
  const [flagButton, setFlagButton] = useState(true);
  const { successSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext(ContextSnackbar);
  const [productOrMachineName, setProductOrMachineName] = useState({
    type: "PRODUCT",
    name: "",
  });
  const [editProductDetail, setEditProductDetail] = useState({
    id: null,
    name: "",
  });
  const AddProductOrMachine = () => {
    AddAdminProduct(
      productOrMachineName,
      (res) => {
        if (res.status === 200) {
          props.handleClose();
          setSuccessSnackbar({ ...successSnackbar, status: true, message: `${productOrMachineName.type.charAt(0) + productOrMachineName.type.toLowerCase().slice(1)} Added Successfully` })
          setProductOrMachineName({ ...productOrMachineName, name: "" })
        }
      },
      (err) => {
        setProductOrMachineName({ ...productOrMachineName, name: "" })
        setEditProductDetail({ ...editProductDetail,  id: null, name: "" })
      }
    );
  };
  const EditProduct = (data) => {
    //
    EditAdminProduct(
      editProductDetail,
      (res) => {
        if (res.status === 200) {
          setEditProductDetail({ ...editProductDetail, id: null, name: "" });
          props.handleClose();
          setSuccessSnackbar({ ...successSnackbar, status: true, message: `${productOrMachineName.type.charAt(0) + productOrMachineName.type.toLowerCase().slice(1)} Edited Successfully` })
          setEditProductDetail({ ...editProductDetail, name: "", })

        }
      },
      (err) => { }
    );
  };
  return (
    <>
      <Dialog
        open={props.addProductDialogControl.status}
        onClose={props.handleClose}
      >
        <div className="px-3 pt-3">
          <h3>Product</h3>
        </div>
        <DialogContent>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Product Name</Typography>
              </div>
              <div className="col-md-12">
                <TextField className="w-100"
                  defaultValue={
                    props.addProductDialogControl.id
                      ? props.addProductDialogControl.name
                      : productOrMachineName.name
                  }
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setFlagButton(false);
                      setProductOrMachineName({
                        ...productOrMachineName,
                        name: e.target.value,
                      });
                      setEditProductDetail({
                        ...editProductDetail,
                        name: e.target.value,
                        id: props.addProductDialogControl.id,
                      });
                    } else {
                      setFlagButton(true);
                    }
                  }}
                  variant="outlined"
                  placeholder="Product Name"
                />
              </div>
            </div>
          </Box>
          {props?.addProductDialogControl?.id === null && (
            <RadioGroup
              row
              defaultValue={
                props?.addProductDialogControl?.id
                  ? props.addProductDialogControl.type
                  : productOrMachineName.type
              }
              onChange={(e) => {
                if (e.target.value !== "") {
                  setProductOrMachineName({
                    ...productOrMachineName,
                    type: e.target.value,
                  });
                }
              }}
            >
              <FormControlLabel
                value="PRODUCT"
                control={<Radio />}
                label="Product"
              />
              <FormControlLabel
                value="MACHINE"
                control={<Radio />}
                label="Machine"
              />
            </RadioGroup>
          )}
        </DialogContent>
        <DialogActions sx={{ marginLeft: "13px", marginRight: "13px" }} className="mt-1 d-flex justify-content-between">
          <Button
            variant="contained"
            disabled={flagButton}
            onClick={() => {
              if (props.addProductDialogControl.id) {
                EditProduct(editProductDetail);
              } else {
                AddProductOrMachine();
              }
            }}
          >
            Ok
          </Button>
          <Button className="cancel-btn" onClick={() => {
            props.handleClose();
            setProductOrMachineName({ ...productOrMachineName, name: "" })
            setEditProductDetail({ ...editProductDetail, name: "" })
          }} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProductDialog;
