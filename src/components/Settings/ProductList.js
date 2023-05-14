import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Button,
  Typography,
  OutlinedInput,
  FormControl,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { GetAdminProductList } from '../../services/apiservices/adminprofile'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import SampleProduct from '../../assets/img/sample_product.png'
import { Context as AuthContext } from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'

// import { ProductIcon } from '../../assets/img/product-icon.svg'
import SnacksPhoto from '../../assets/img/SnacksPhoto.png'
const ViewProductDialog = React.lazy(() => import('./ViewProductDialog'))
const DeleteProductDialog = React.lazy(() => import('./DeleteProductDialog'))

const ProductList = () => {
  const { flagLoader, permissions } = useContext(AuthContext).state
  const navigate = useNavigate()
  const [addProductDialogControl, setAddProductDialogControl] = useState({
    status: false,
    id: null,
    name: '',
    type: '',
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteProductDialogControl, setDeleteProductDialogControl] = useState({
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
  const handleGetAdminProduct = () => {
    GetAdminProductList(
      {},
      res => {
        if (res.success) {
          setAdminProductList(res?.data?.products)
        }
      },
      err => {
        console.log('Printing Error', err)
      },
    )
  }
  useEffect(() => {
    handleGetAdminProduct()
  }, [])
  const handleClose = () => {
    setDeleteProductDialogControl({
      ...deleteProductDialogControl,
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
      <Box className="main_tab_section">
        <Box className="tab_header">
          <Box>
            <Typography variant="span">All Products</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FormControl variant="outlined">
              <OutlinedInput
                className="search_field"
                placeholder="Search Here..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                startAdornment={
                  <InputAdornment position="start" sx={{ margin: '0px' }}>
                    <IconButton sx={{ margin: '0px' }}>
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {permissions?.editProduct && (
              <Button
                className="main_tab_button"
                variant="span"
                onClick={() => {
                  navigate('/addproduct')
                }}
                // variant="contained"
              >
                + Add Product
              </Button>
            )}
          </Box>
        </Box>

        <Box className="below_main_tab_section">
          {/* <TabPanel value="ProductList"> */}
          <Box className="row">
            {AdminProductList &&
              AdminProductList.map(row => {
                console.log({ row: row })
                let image_url = `${process.env.REACT_APP_API_CALL_URL}/file/${row?.imageUrl}`
                return (
                  <>
                    <Box
                      className="product_card"
                      onClick={() =>
                        setViewProductDialog({
                          ...viewProductDialog,
                          status: true,
                          id: row?.id,
                        })
                      }
                    >
                      {/* <img src={image_url} alt="sample" /> */}
                      {/* {row.imageUrl ? (
                        <img
                          src={row.imageUrl}
                          alt={row.name}
                          height={100}
                          width={100}
                        />
                      ) : (
                        <img
                          // src="../../assets/img/product-icon.svg"
                          src={ProductIcon}
                          alt={row.name}
                        />
                      )} */}
                      {row.imageUrl ? (
                        <img
                          src={row.imageUrl}
                          alt={row.name}
                          height={100}
                          width={100}
                        />
                      ) : (
                        <AccountCircleRoundedIcon className="user_profile_icon" />
                      )}
                    </Box>
                  </>
                )
              })}
          </Box>
          {/* </TabPanel> */}
        </Box>
        {/* </TabContext> */}
        <DeleteProductDialog
          deleteProductDialogControl={deleteProductDialogControl}
          handleClose={handleClose}
          handleGetAdminProduct={handleGetAdminProduct}
        />
        <ViewProductDialog
          handleClose={handleClose}
          viewProductDialog={viewProductDialog}
          deleteProductDialogControl={deleteProductDialogControl}
          setDeleteProductDialogControl={setDeleteProductDialogControl}
        />
      </Box>
    </>
  )
}

export default ProductList
