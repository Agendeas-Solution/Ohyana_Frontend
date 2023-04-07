import React, { useEffect, useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import SampleProduct from '../../assets/img/sample_product.png'
import { GetProductDetail } from '../../services/apiservices/productDetail'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'
import {
  DeleteAdminProduct,
  UpdateProductQuantity,
} from '../../services/apiservices/adminprofile'
const ViewProductDialog = ({ viewProductDialog, handleClose }) => {
  const [productDetail, setProductDetail] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    GetProductDetail(
      viewProductDialog?.id,
      res => {
        setProductDetail(res?.data)
      },
      err => {},
    )
  }, [viewProductDialog?.id])
  const handleDeleteProduct = () => {
    DeleteAdminProduct(
      viewProductDialog?.id,
      res => {
        console.log('Printing Response', res.data)
        handleClose()
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }
  const handleProductQuantityUpdate = () => {
    UpdateProductQuantity(
      productDetail?.quantity,
      viewProductDialog?.id,
      res => {
        console.log('Printing Response UpdateProductQuantity', res.data)
        handleClose()
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }
  return (
    <>
      <Dialog open={viewProductDialog.status} onClose={handleClose}>
        <DialogTitle className="common_row">
          <Typography variant="span">{productDetail?.name}</Typography>
          <Box>
            <Button
              onClick={() => navigate(`/editproduct/${viewProductDialog?.id}`)}
              className="common_button"
            >
              <EditRoundedIcon />
            </Button>
            <Button onClick={handleDeleteProduct} className="common_button">
              <DeleteRoundedIcon />
            </Button>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box className="product_dialog_detail_section">
            <Box className="product_dialog_left_Section">
              <Box className="dialog_product_image">
                <img src={SampleProduct} alt="" />
              </Box>
              <TextField
                value={productDetail?.quantity}
                onChange={e =>
                  setProductDetail({
                    ...productDetail,
                    quantity: e.target.value,
                  })
                }
                placeholder="Number"
              />
              <Button onClick={handleProductQuantityUpdate} variant="contained">
                Stock
              </Button>
            </Box>
            <Box className="product_dialog_right_section">
              <Box className="common_row mb-1">
                <Typography className="common_heading" variant="span">
                  Id
                </Typography>
                <Typography variant="span">{productDetail?.id}</Typography>
              </Box>
              <Box className="common_row mb-1">
                <Typography className="common_heading" variant="span">
                  Price
                </Typography>
                <Typography variant="span">{productDetail?.price}</Typography>
              </Box>
              <Box className="common_row mb-1">
                <Typography className="common_heading" variant="span">
                  Material Type
                </Typography>
                <Typography variant="span">
                  {productDetail?.materialType}
                </Typography>
              </Box>
              <Box className="common_row mb-1">
                <Typography className="common_heading" variant="span">
                  Weight
                </Typography>
                <Typography variant="span">{productDetail?.weight}</Typography>
              </Box>
              <Box className="row mb-1">
                <Typography className="common_heading" variant="span">
                  Description
                </Typography>
                <Typography variant="span">
                  {productDetail?.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ViewProductDialog
