import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material'
import { GetProductDetail } from '../../services/apiservices/productDetail'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import Divider from '@mui/material/Divider'
import { useNavigate } from 'react-router-dom'
import { UpdateProductQuantity } from '../../services/apiservices/adminprofile'
import PermissionsGate from './PermissionGate'
import { PERMISSION } from '../../constants'
import { Context as ContextSnackbar } from '../../context/pageContext'
const ViewProductDialog = ({
  viewProductDialog,
  handleClose,
  deleteProductDialogControl,
  setDeleteProductDialogControl,
}) => {
  const [productDetail, setProductDetail] = useState({})
  const navigate = useNavigate()
  const { errorSnackbar, successSnackbar } = useContext(ContextSnackbar)?.state
  const { setErrorSnackbar, setSuccessSnackbar } = useContext(ContextSnackbar)
  useEffect(() => {
    viewProductDialog?.id &&
      GetProductDetail(
        viewProductDialog?.id,
        {},
        res => {
          setProductDetail(res?.data)
        },
        err => {},
      )
  }, [viewProductDialog?.id])

  const handleProductQuantityUpdate = () => {
    UpdateProductQuantity(
      viewProductDialog?.id,
      { quantity: parseInt(productDetail?.quantity) },
      res => {
        handleClose()
        setSuccessSnackbar({
          ...successSnackbar,
          message: res.message,
          status: true,
        })
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

  return (
    <>
      <Dialog
        open={viewProductDialog.status}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="detail_row product_dialogue_field">
          <Typography className="product_dialog_heading" variant="span">
            {productDetail?.name}
          </Typography>

          <Box>
            <PermissionsGate scopes={[PERMISSION.PERMISSIONS.EDIT_PRODUCT]}>
              <Button
                onClick={() =>
                  navigate(`/editproduct/${viewProductDialog?.id}`)
                }
                className="product_detail_buttons"
              >
                <EditRoundedIcon />
              </Button>
            </PermissionsGate>

            <PermissionsGate scopes={[PERMISSION.PERMISSIONS.DELETE_PRODUCT]}>
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
            </PermissionsGate>
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
                  InputLabelProps={{ shrink: true }}
                  placeholder="Quantity"
                />
                <PermissionsGate scopes={[PERMISSION.PERMISSIONS.EDIT_PRODUCT]}>
                  <Button
                    sx={{ backgroundColor: '#2E3591', marginLeft: '5px' }}
                    size="large"
                    onClick={handleProductQuantityUpdate}
                    variant="contained"
                  >
                    Update
                  </Button>
                </PermissionsGate>
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
              <Box
                sx={{ justifyContent: 'space-between' }}
                className="detail_row product_detail_dia_right_section"
              >
                <Typography
                  className="common_heading product_dialogue_field"
                  variant="span"
                >
                  Sku Id
                </Typography>
                <Typography variant="span">
                  {productDetail?.skuId || '-'}
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
