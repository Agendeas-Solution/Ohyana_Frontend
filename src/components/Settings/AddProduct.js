import React, { useState, useEffect } from "react";
import {Box,Button,Typography,TextField, TextareaAutosize} from "@mui/material";
import {AddAdminProduct,EditAdminProduct} from "../../services/apiservices/adminprofile";
import { GetProductDetail } from "../../services/apiservices/productDetail";
const AddProduct = (props) => {
  const [productDetail, setProductDetail] = useState({
    name: "",
    skuId: "",
    price: "",
    quantity: "",
    materialType: "",
    weight: "",
    description: ""
  })
  let path = window.location.pathname;
  console.log("Printing Path of ", path);
  console.log("Printing ", path.split("/").pop());
  path = path.split("/").pop();
  useEffect(() => {
    parseInt(path) && GetProductDetail(parseInt(path), (res) => {
      setProductDetail({ ...productDetail, name: res.data.name, description: res.data.description, price: res.data.price, quantity: res.data.quantity, materialType: res.data.materialType, weight: res.data.weight, skuId: res.data.skuId });
    }, (err) => {

    })
  }, [])
  const handleAddProduct = () => {
    if (parseInt(path)) {
      EditAdminProduct(
        productDetail, parseInt(path),
        (res) => {
          if (res.status === 200) {
            console.log("printing Data", res.data)
          }
        },
        (err) => { }
      );
    }
    else {
      AddAdminProduct(
        productDetail,
        (res) => {
          if (res.status === 200) {
            console.log("printing Data", res.data)
          }
        },
        (err) => {
        }
      );
    }
  };
  return (
    <>
      {/* <Dialog
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
                handleAddProduct();
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
      </Dialog> */}
      <Box className="edit_profile_section">
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Product Name
            </Typography>
            <TextField
              placeholder="Enter Product Name"
              onChange={(e) => {
                setProductDetail({ ...productDetail, name: e.target.value });
              }}
              value={productDetail.name}
              className="form-control"
              variant="outlined"
              label=""
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Product Id
            </Typography>
            <TextField
              placeholder="Enter Product Id"
              onChange={(e) => {
                setProductDetail({ ...productDetail, skuId: e.target.value });
              }}
              value={productDetail.skuId}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Price (1 pc)
            </Typography>
            <TextField
              placeholder="Enter Price"
              autoComplete={false}
              onChange={(e) => {
                setProductDetail({ ...productDetail, price: e.target.value });
              }}
              value={productDetail.price}
              variant="outlined"
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Available Quantity
            </Typography>
            <TextField
              placeholder="Enter Quantity"
              onChange={(e) => {
                setProductDetail({ ...productDetail, quantity: e.target.value });
              }}
              value={productDetail.quantity}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Material Type
            </Typography>
            <TextField
              placeholder="Enter Material Type"
              onChange={(e) => {
                setProductDetail({ ...productDetail, materialType: e.target.value });
              }}
              value={productDetail.materialType}
            />
          </Box>
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Weight
            </Typography>
            <TextField
              placeholder="Enter Weight"
              onChange={(e) => {
                setProductDetail({ ...productDetail, weight: e.target.value });
              }}
              value={productDetail.weight}
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <Typography className="input_field_label" variant="span">
              Description
            </Typography>
            <TextareaAutosize
              placeholder="Description Here..."
              className="w-100"
              minRows={3}
              value={productDetail.description}
              onChange={(e) => {
                setProductDetail({
                  ...productDetail,
                  description: e.target.value,
                });
              }}
            />
          </Box>
        </Box>
        <Box sx={{ justifyContent: "flex-start" }} className="input_field_row">
          <Button
            onClick={handleAddProduct}
            variant="contained"
            className="edit_page_save_button"
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddProduct;
