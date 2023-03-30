import React, { useState, useEffect, useContext } from 'react'
import { Box, Tabs, Tab, Button, Typography } from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import DeleteProductDialog from './DeleteProductDialog'
import { GetAdminProductList } from '../../services/apiservices/adminprofile'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import SampleProduct from '../../assets/img/sample_product.png'
import { Context as AuthContext } from '../../context/authContext/authContext'
import ViewProductDialog from './ViewProductDialog'
import { useNavigate } from 'react-router-dom'
import SnacksPhoto from '../../assets/img/SnacksPhoto.png'

const ProductList = () => {
  const { flagLoader, permissions } = useContext(AuthContext).state
  const navigate = useNavigate()
  const [addProductDialogControl, setAddProductDialogControl] = useState({
    status: false,
    id: null,
    name: '',
    type: '',
  })
  const [DeleteProductDialogControl, setDeleteProductDialogControl] = useState({
    status: false,
    id: null,
    type: '',
  })
  const [value, setValue] = useState('ProductList')
  const [viewProductDialog, setViewProductDialog] = useState({
    status: false,
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [AdminProductList, setAdminProductList] = useState([])
  useEffect(() => {
    GetAdminProductList(
      {},
      res => {
        if (res.success) {
          setAdminProductList(res?.data?.products)
        }
      },
      err => {
        console.log('Printing Error', err)
        //
      },
    )
  }, [addProductDialogControl.status, DeleteProductDialogControl.status])
  const handleClose = () => {
    setDeleteProductDialogControl({
      ...DeleteProductDialogControl,
      status: false,
    })
    setViewProductDialog({ ...viewProductDialog, status: false })
    setAddProductDialogControl({
      ...addProductDialogControl,
      status: false,
      id: null,
    })
  }
  return (
    <>
      <TabContext value={value}>
        <div className="add_product_button p-3">
          <Typography variant="span">All Products</Typography>
          {permissions?.editProduct && (
            <Button
              onClick={() => {
                navigate('/addproduct')
              }}
              // variant="contained"
              className="main_product_button"
              sx={{ color: '#2E3591' }}
            >
              + Add Product
            </Button>
          )}
        </div>
        <Box className="product_list_section">
          <TabPanel value="ProductList">
            <div className="p-2 h-75 row">
              {AdminProductList.map(row => {
                let image_url = `${process.env.REACT_APP_API_CALL_URL}/file/${row?.imageUrl}`
                console.log(image_url)
                return (
                  <>
                    <Box
                      className="product_card me-4 mx-3"
                      onClick={() =>
                        setViewProductDialog({
                          ...viewProductDialog,
                          status: true,
                          id: row?.id,
                        })
                      }
                    >
                      {/* <img src={image_url} alt="sample" /> */}
                      <img src={SnacksPhoto} alt="sample" />
                    </Box>
                  </>
                )
              })}
            </div>
          </TabPanel>
        </Box>
      </TabContext>
      <DeleteProductDialog
        DeleteProductDialogControl={DeleteProductDialogControl}
        handleClose={handleClose}
      />
      <ViewProductDialog
        handleClose={handleClose}
        viewProductDialog={viewProductDialog}
      />
    </>
  )
}

export default ProductList
