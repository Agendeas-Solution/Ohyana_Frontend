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
import { AccountCircle } from '@mui/icons-material'

const ViewProductDialog = ({
  viewProductDialog,
  handleClose,
  deleteProductDialogControl,
  setDeleteProductDialogControl,
}) => {
  const [productDetail, setProductDetail] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    GetProductDetail(
      viewProductDialog?.id,
      {},
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
        handleClose()
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }

  const handleProductQuantityUpdate = () => {
    UpdateProductQuantity(
      viewProductDialog?.id,
      { quantity: parseInt(productDetail?.quantity) },
      res => {
        handleClose()
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }

  return (
    <>
      <Dialog
        open={viewProductDialog.status}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          // sx={{ justifyContent: 'space-between' }}
          // className="product_dialogue_field"
          className="detail_row product_dialogue_field"
        >
          <Typography className="product_dialog_heading" variant="span">
            {productDetail?.name}
          </Typography>

          <Box>
            <Button
              onClick={() => navigate(`/editproduct/${viewProductDialog?.id}`)}
              className="product_detail_buttons"
            >
              <EditRoundedIcon />
            </Button>
            <Button
              onClick={() =>
                setDeleteProductDialogControl({
                  ...deleteProductDialogControl,
                  status: true,
                  id: viewProductDialog?.id,
                })
              }
              className="product_detail_buttons"
            >
              <DeleteRoundedIcon />
            </Button>
          </Box>
        </DialogTitle>

        <Divider
          sx={{ borderColor: '#C4C4C4' }}
          orientation="horizontal"
          width="100%"
        />

        <DialogContent>
          <Box className="product_dialog_detail_section">
            <Box className="product_dialog_left_Section">
              <Box className="dialog_product_image">
                {/* <img src={SampleProduct} alt="" /> */}
                <img
                  src={productDetail?.imageUrl}
                  alt={productDetail?.name}
                  style={{ height: '100%', width: '100%' }}
                />
              </Box>

              <Box className="update_button_section">
                <TextField
                  variant="outlined"
                  label={productDetail?.quantity ? 'Current Stock' : ''}
                  size="small"
                  value={productDetail?.quantity}
                  onChange={e =>
                    setProductDetail({
                      ...productDetail,
                      quantity: e.target.value,
                    })
                  }
                  placeholder="Quantity"
                />
                <Button
                  sx={{ backgroundColor: '#2E3591', marginLeft: '5px' }}
                  size="large"
                  onClick={handleProductQuantityUpdate}
                  variant="contained"
                >
                  Update
                </Button>
              </Box>
            </Box>
            <Box className="product_dialog_right_section">
              <Box
                sx={{ justifyContent: 'space-between' }}
                className="detail_row product_detail_dia_right_section"
              >
                <Typography
                  className="common_heading product_dialogue_field"
                  variant="span"
                >
                  Id
                </Typography>
                <Typography variant="span">
                  {productDetail?.id || '-'}
                </Typography>
              </Box>

              <Box className="detail_row product_detail_dia_right_section product_dialogue_field">
                <Typography className="common_heading" variant="span">
                  Price
                </Typography>
                <Typography variant="span">
                  {productDetail?.price || '-'}
                </Typography>
              </Box>

              <Box className="detail_row product_detail_dia_right_section product_dialogue_field">
                <Typography className="common_heading" variant="span">
                  Material Type
                </Typography>
                <Typography variant="span">
                  {productDetail?.materialType || '-'}
                </Typography>
              </Box>

              <Box className="detail_row product_detail_dia_right_section product_dialogue_field">
                <Typography className="common_heading" variant="span">
                  Weight
                </Typography>
                <Typography variant="span">
                  {productDetail?.weight || '-'}
                </Typography>
              </Box>

              <Box className="detail_row product_detail_dia_right_section product_dialogue_field">
                <Typography className="common_heading" variant="span">
                  Description
                </Typography>
                <Typography variant="span">
                  {productDetail?.description || '-'}
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
