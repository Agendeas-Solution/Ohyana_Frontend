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
import ProfileImage from '../../assets/img/Profile_Image.svg'
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
      <Box className="main_section" sx={{ overflow: 'hidden', padding: '0px' }}>
        <Box className="pofile_edit_section">
          <Box className="edit_profile_image_section">
            <img src={ProfileImage} alt="profile" />
          </Box>

          <Box className="edit_profile_detail_section">
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
                    setProductDetail({
                      ...productDetail,
                      skuId: e.target.value,
                    })
                  }}
                />
              </Box>
            </Box>
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
                  label="Price (1 pc)"
                  placeholder="Enter Price"
                  autoComplete={false}
                  variant="outlined"
                  value={productDetail.price}
                  onChange={e => {
                    setProductDetail({
                      ...productDetail,
                      price: e.target.value,
                    })
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
                    setProductDetail({
                      ...productDetail,
                      weight: e.target.value,
                    })
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
              <Box className="input_fields" sx={{ width: '50%' }}>
                <TextField
                  multiline
                  label="Description"
                  placeholder="Description Here..."
                  minRows={3}
                  maxRows={3}
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
            <Box
              sx={{ justifyContent: 'flex-start' }}
              className="input_field_row"
            >
              <Button
                onClick={handleAddProduct}
                variant="contained"
                className="edit_page_save_button"
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AddProduct
