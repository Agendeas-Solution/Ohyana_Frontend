import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
} from '@mui/material'
import {
  AddAdminProduct,
  EditAdminProduct,
} from '../../services/apiservices/adminprofile'
import { GetProductDetail } from '../../services/apiservices/productDetail'
import { useNavigate } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
import CompanyIcon from '../../assets/img/companyIcon.svg'

const AddProduct = props => {
  const [productDetail, setProductDetail] = useState({
    name: '',
    skuId: '',
    price: '',
    quantity: '',
    materialType: '',
    weight: '',
    description: '',
  })
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const navigate = useNavigate()
  let path = window.location.pathname
  path = path.split('/').pop()
  useEffect(() => {
    parseInt(path) &&
      GetProductDetail(
        parseInt(path),
        {},
        res => {
          setProductDetail({
            ...productDetail,
            name: res.data.name,
            description: res.data.description,
            price: res.data.price,
            quantity: res.data.quantity,
            materialType: res.data.materialType,
            weight: res.data.weight,
            skuId: res.data.skuId,
          })
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err.response.data.message,
          })
        },
      )
  }, [])
  const handleAddProduct = () => {
    if (parseInt(path)) {
      EditAdminProduct(
        productDetail,
        parseInt(path),
        res => {
          if (res.success) {
            navigate('/productlist')
            setSuccessSnackbar({
              ...successSnackbar,
              message: res?.message,
              status: true,
            })
          }
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err?.response?.data?.message,
          })
        },
      )
    } else {
      AddAdminProduct(
        productDetail,
        res => {
          if (res.success) {
            navigate('/productlist')
            setSuccessSnackbar({
              ...successSnackbar,
              message: res?.message,
              status: true,
            })
          }
        },
        err => {
          setErrorSnackbar({
            ...errorSnackbar,
            status: true,
            message: err?.response?.data?.message,
          })
        },
      )
    }
  }
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
      {/* <Box className="edit_profile_section"> */}
      <Box className="product_list_add_section">
        <Box className="input_field_row justify-content-center">
          <Box className="product_profile_icon">
            <img
              src={CompanyIcon}
              className="user_profile_icon"
              alt="profile"
            />
          </Box>
        </Box>

        <Box className="input_field_row">
          <Box className="input_fields">
            <TextField
              label=" Product Name"
              placeholder="Enter Product Name"
              variant="outlined"
              value={productDetail.name}
              onChange={e => {
                setProductDetail({ ...productDetail, name: e.target.value })
              }}
            />
          </Box>
          <Box className="input_fields">
            <TextField
              label="SKU Id"
              placeholder="Enter SKU Id"
              variant="outlined"
              value={productDetail.skuId}
              onChange={e => {
                setProductDetail({ ...productDetail, skuId: e.target.value })
              }}
            />
          </Box>
        </Box>
        {/* Price &&  Enter Quantity */}

        <Box className="input_field_row">
          <Box className="input_fields">
            <TextField
              label="Price (1 pc)"
              placeholder="Enter Price"
              autoComplete={false}
              variant="outlined"
              value={productDetail.price}
              onChange={e => {
                setProductDetail({ ...productDetail, price: e.target.value })
              }}
            />
          </Box>
          <Box className="input_fields">
            <TextField
              label="Available Quantity"
              placeholder="Enter Quantity"
              variant="outlined"
              value={productDetail.quantity}
              onChange={e => {
                setProductDetail({
                  ...productDetail,
                  quantity: e.target.value,
                })
              }}
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <TextField
              label="Weight"
              placeholder="Enter Weight"
              variant="outlined"
              value={productDetail.weight}
              onChange={e => {
                setProductDetail({ ...productDetail, weight: e.target.value })
              }}
            />
          </Box>

          <Box className="input_fields">
            <TextField
              label="Material Type"
              placeholder="Enter Material Type"
              variant="outlined"
              value={productDetail.materialType}
              onChange={e => {
                setProductDetail({
                  ...productDetail,
                  materialType: e.target.value,
                })
              }}
            />
          </Box>
        </Box>
        <Box className="input_field_row">
          <Box className="input_fields">
            <TextField
              multiline
              label="Description"
              placeholder="Description Here..."
              minRows={3}
              autoComplete="off"
              variant="outlined"
              value={productDetail.description}
              onChange={e => {
                setProductDetail({
                  ...productDetail,
                  description: e.target.value,
                })
              }}
            />
          </Box>
        </Box>
        <Box sx={{ justifyContent: 'flex-start' }} className="input_field_row">
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
  )
}

export default AddProduct
