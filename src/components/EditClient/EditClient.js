import React, { useEffect, useState, useContext } from 'react'
import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Autocomplete,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  GetAdminProductList,
  EditClientDetail,
} from '../../services/apiservices/adminprofile'
import {
  GetAdminClientProfileDetail,
  GetCountryList,
} from '../../services/apiservices/clientDetail'
import { useNavigate } from 'react-router-dom'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { CLIENT } from '../../constants/clientConstant'
import ProfileImage from '../../assets/img/Profile_Image.svg'
const SuccessSnackbar = React.lazy(() =>
  import('../SuccessSnackbar/SuccessSnackbar'),
)

const EditClient = () => {
  const [userDetail, setUserDetail] = useState({
    clientName: '',
    reference: '',
    email: null,
    contactNo: null,
    clientType: '',
    country: null,
    inquiryfor: '',
    address: '',
    state: '',
    city: '',
    business: '',
    referenceName: null,
  })
  const [adminProductList, setAdminProductList] = useState([])
  const [filteredProductList, setFilteredProductList] = useState([])
  const [successDialog, setSuccessDialog] = useState(false)
  const [countryList, setCountryList] = useState([])
  const navigate = useNavigate()
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleChange = prop => event => {
    setUserDetail({ ...userDetail, [prop]: event.target.value })
  }

  useEffect(() => {
    let path = window.location.pathname
    path = path.split('/').pop()
    GetCountryList(
      {},
      res => {
        if (res.success) {
          setCountryList(res.data)
        }
      },
      err => {
        console.log('Printing ', err)
      },
    )
    GetAdminClientProfileDetail(
      parseInt(path),
      {},
      res => {
        if (res.success) {
          setUserDetail({
            ...userDetail,
            clientName: res.data.name,
            reference: res.data.reference,
            email: res.data?.email,
            max_invesment_amount: res.data?.max_invesment_amount,
            contactNo: res.data?.contact_number,
            country: res.data?.country,
            state: res.data?.state,
            address: res.data?.address,
            city: res.data?.city,
            business: res.data?.business,
            clientType: res.data?.isInternational,
            referenceName: res.data?.reference_name,
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
  }, [])
  // useEffect(() => {
  //   GetAdminProductList(
  //     {},
  //     res => {
  //       if (res.success) {
  //         setAdminProductList(res?.data?.products)
  //         const inquiry_type = [
  //           ...new Set(userDetail?.product.map(item => item?.type)),
  //         ]
  //         if (inquiry_type.length > 1) {
  //           setUserDetail({ ...userDetail, inquiryfor: 'BOTH' })
  //         } else if (inquiry_type.length > 0 && inquiry_type.length < 2) {
  //           setUserDetail({ ...userDetail, inquiryfor: inquiry_type[0] })
  //         }
  //       }
  //     },
  //     err => {
  //       console.log('Printing Error', err)
  //     },
  //   )

  //   let productlist = []
  //   if (userDetail.inquiryfor === 'BOTH') {
  //     productlist = adminProductList.map(value => {
  //       return value
  //     })
  //   } else if (userDetail.inquiryfor === 'PRODUCT') {
  //     productlist = adminProductList.map(value => {
  //       return value.type === 'PRODUCT' && value
  //     })
  //   } else if (userDetail.inquiryfor === 'MACHINE') {
  //     productlist = adminProductList.map(value => {
  //       return value.type === 'MACHINE' && value
  //     })
  //   }
  //   setFilteredProductList(productlist)
  // }, [userDetail?.inquiryfor])
  const EditClient = () => {
    if (
      userDetail.clientName !== '' &&
      (userDetail.email || userDetail.contactNo) &&
      userDetail.reference &&
      userDetail.clientType !== '' &&
      userDetail.state !== '' &&
      userDetail.city !== '' &&
      userDetail.memberId !== '' &&
      userDetail.country
    ) {
      let clientDetail = {
        name: userDetail.clientName,
        email: userDetail.email,
        reference: userDetail.reference,
        business: userDetail.business,
        contact_number: userDetail.contactNo,
        max_invesment_amount: userDetail?.max_invesment_amount,
        isInternational: userDetail.clientType,
        state: userDetail.state,
        address: userDetail.address,
        countryId: userDetail.country?.id,
        city: userDetail.city,
        reference_name: userDetail?.referenceName,
      }
      let path = window.location.pathname
      path = path.split('/').pop()
      EditClientDetail(
        path,
        clientDetail,
        res => {
          if (res.success) {
            navigate(`/clientprofile/${path}`)
            setSuccessSnackbar({
              ...successSnackbar,
              status: true,
              message: res.data.message,
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
      <Box className="main_section">
        <Box className="pofile_edit_section">
          <Box className="edit_profile_image_section">
            <img src={ProfileImage} alt="profile" />
          </Box>
          <Box className="edit_profile_detail_section">
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
                  label="Client Name"
                  onChange={e => {
                    setUserDetail({ ...userDetail, clientName: e.target.value })
                  }}
                  value={userDetail.clientName}
                  variant="outlined"
                />
              </Box>

              <Box className="input_fields">
                <TextField
                  label="Business Name"
                  onChange={e => {
                    setUserDetail({ ...userDetail, business: e.target.value })
                  }}
                  value={userDetail.business}
                  variant="outlined"
                />
              </Box>
            </Box>

            {/* Contact No. &&  Investment Scale*/}
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
                  label="Contact No"
                  onChange={e => {
                    setUserDetail({ ...userDetail, contactNo: e.target.value })
                  }}
                  value={userDetail.contactNo}
                  variant="outlined"
                />
              </Box>

              <Box className="input_fields">
                <TextField
                  label="Investment Scale"
                  onChange={e => {
                    setUserDetail({
                      ...userDetail,
                      max_invesment_amount: e.target.value,
                    })
                  }}
                  value={userDetail.max_invesment_amount}
                  variant="outlined"
                />
              </Box>
            </Box>

            {/* Email && Address*/}
            <Box className="input_field_row">
              <Box className="input_fields">
                <TextField
                  label="Email"
                  onChange={e => {
                    setUserDetail({ ...userDetail, email: e.target.value })
                  }}
                  value={userDetail.email}
                  variant="outlined"
                />
              </Box>
              <Box className="input_fields">
                <TextField
                  autocomplete="off"
                  label="Address"
                  onChange={e => {
                    setUserDetail({ ...userDetail, address: e.target.value })
                  }}
                  value={userDetail.address}
                  variant="outlined"
                />
              </Box>
            </Box>

            {/* Client Type & City*/}
            <Box className="input_field_row">
              <Box className="input_fields">
                <FormControl>
                  <InputLabel>Client Type</InputLabel>
                  <Select
                    label="Client Type"
                    value={userDetail?.clientType}
                    onChange={e => {
                      setUserDetail({
                        ...userDetail,
                        clientType: e.target.value,
                      })
                    }}
                  >
                    {CLIENT.CLIENTTYPE.map(data => {
                      return (
                        <MenuItem value={data.type}>{data.fieldName}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>

              <Box className="input_fields">
                <TextField
                  label="City"
                  onChange={e => {
                    setUserDetail({ ...userDetail, city: e.target.value })
                  }}
                  value={userDetail.city}
                  variant="outlined"
                />
              </Box>
            </Box>
            {/* Country & State*/}
            <Box className="input_field_row">
              <Box className="input_fields">
                <Autocomplete
                  disablePortal
                  options={countryList}
                  value={userDetail?.country}
                  onChange={(e, value) => {
                    setUserDetail({ ...userDetail, country: value })
                  }}
                  getOptionLabel={option => option?.name}
                  renderInput={params => (
                    <TextField {...params} label="Select Country" />
                  )}
                />
              </Box>

              <Box className="input_fields">
                <TextField
                  label="State"
                  onChange={e => {
                    setUserDetail({ ...userDetail, state: e.target.value })
                  }}
                  value={userDetail.state}
                  variant="outlined"
                />
              </Box>
            </Box>

            {/* Reference Name*/}
            <Box className="input_field_row">
              <Box className="input_fields">
                <FormControl>
                  <InputLabel>Reference</InputLabel>
                  <Select
                    label="Reference"
                    value={userDetail.reference}
                    onChange={e => {
                      setUserDetail({
                        ...userDetail,
                        reference: e.target.value,
                        referenceName: '',
                      })
                    }}
                  >
                    <MenuItem value="DIGITAL">Digital</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {userDetail.reference === 'OTHER' && (
                <Box className="input_fields">
                  <TextField
                    label="Reference Name"
                    onChange={e => {
                      setUserDetail({
                        ...userDetail,
                        referenceName: e.target.value,
                      })
                    }}
                    value={userDetail.referenceName}
                    variant="outlined"
                  />
                </Box>
              )}
              {userDetail.reference === 'DIGITAL' && (
                <Box className="input_fields">
                  <FormControl>
                    <InputLabel>Reference Name</InputLabel>
                    <Select
                      label="Reference"
                      value={userDetail.referenceName}
                      onChange={e => {
                        setUserDetail({
                          ...userDetail,
                          referenceName: e.target.value,
                        })
                      }}
                    >
                      <MenuItem value="INDIAMART">IndiaMart</MenuItem>
                      <MenuItem value="WEBSITE">Website</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
            </Box>
            {/* Save Button */}

            <Button
              onClick={EditClient}
              variant="contained"
              className="edit_page_save_button"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default EditClient
