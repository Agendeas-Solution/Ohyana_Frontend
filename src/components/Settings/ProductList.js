import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  FormControl,
  IconButton,
  InputAdornment,
  Pagination,
} from '@mui/material'
import { GetAdminProductList } from '../../services/apiservices/adminprofile'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useNavigate } from 'react-router-dom'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import PermissionsGate from './PermissionGate'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { PERMISSION } from '../../constants'
const ViewProductDialog = React.lazy(() => import('./ViewProductDialog'))
const DeleteProductDialog = React.lazy(() => import('./DeleteProductDialog'))
const ProductList = () => {
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
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [totalResult, setTotalresult] = useState()
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const [value, setValue] = useState('ProductList')
  const [viewProductDialog, setViewProductDialog] = useState({
    status: false,
  })
  const [AdminProductList, setAdminProductList] = useState([])
  const handleGetAdminProduct = () => {
    GetAdminProductList(
      {
        page: currentPage,
        size: rowsPerPage,
      },
      res => {
        if (res.success) {
          setTotalresult(res?.data?.totalPage)
          let pages =
            res?.data?.totalPage > 0
              ? Math.ceil(res?.data?.totalPage / rowsPerPage)
              : null
          setNumbersToDisplayOnPagination(pages)
          setAdminProductList(res?.data?.proudcts)
        }
      },
      err => {},
    )
  }
  useEffect(() => {
    handleGetAdminProduct()
  }, [currentPage])
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
            <PermissionsGate scopes={[PERMISSION.PERMISSIONS.EDIT_PRODUCT]}>
              <Button
                className="main_tab_button"
                variant="span"
                onClick={() => {
                  navigate('/addproduct')
                }}
              >
                + Add Product
              </Button>
            </PermissionsGate>
          </Box>
        </Box>
        <Box className="below_main_tab_section">
          <Box className="row">
            {AdminProductList &&
              AdminProductList.map(row => {
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
          <Pagination
            className="pagination_style"
            boundaryCount={0}
            siblingCount={0}
            size="small"
            shape="rounded"
            count={numbersToDisplayOnPagination}
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value)
            }}
          />
        </Box>

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
