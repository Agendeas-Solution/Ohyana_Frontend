import { React, useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem, Autocomplete
} from "@mui/material";
import {
  GetAdminProductList,
  AddClientDetail
} from "../../services/apiservices/adminprofile";
import { useNavigate } from "react-router-dom";
import { GetCountryList } from "../../services/apiservices/clientDetail";
import { Context as ContextSnackbar } from "../../context/pageContext";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";
const AddClient = () => {
  const [userDetail, setUserDetail] = useState({
    clientName: "",
    reference: "",
    email: null,
    contactNo: null,
    clientType: "",
    country: null,
    inquiryfor: "",
    product: [],
    address: "",
    state: "",
    city: "",
    business: "",
    referenceName: null
  });
  const [adminProductList, setAdminProductList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const navigate = useNavigate();
  const [filteredProductList, setFilteredProductList] = useState([]);
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar);
  const handleChange = (prop) => (event) => {
    setUserDetail({ ...userDetail, [prop]: event.target.value });
  };

  useEffect(() => {
    GetAdminProductList(
      {},
      (res) => {
        if (res.status === 200) {
          setAdminProductList(res?.data?.products);
          //
        }
      },
      (err) => {
        console.log("Printing Error", err);
      }
    );
    GetCountryList(
      {},
      (res) => {
        if (res.status === 200) {
          setCountryList(res.data.country);
        }
      },
      (err) => {
        console.log("Printing ", err);
      }
    );
  }, []);
  useEffect(() => {
    GetAdminProductList(
      {},
      (res) => {
        if (res.status === 200) {
          setAdminProductList(res?.data?.products);
          const inquiry_type = [
            ...new Set(userDetail?.product.map((item) => item?.type)),
          ];
          if (inquiry_type.length > 1) {
            setUserDetail({ ...userDetail, inquiryfor: "BOTH" });
          } else if (inquiry_type.length > 0 && inquiry_type.length < 2) {
            setUserDetail({ ...userDetail, inquiryfor: inquiry_type[0] });
          }
        }
      },
      (err) => {
        console.log("Printing Error", err);
      }
    );

    let productlist = [];
    if (userDetail.inquiryfor === "BOTH") {
      productlist = adminProductList.map((value) => {
        return value;
      });
    } else if (userDetail.inquiryfor === "PRODUCT") {
      productlist = adminProductList.map((value) => {
        return value.type === "PRODUCT" && value;
      });
    } else if (userDetail.inquiryfor === "MACHINE") {
      productlist = adminProductList.map((value) => {
        return value.type === "MACHINE" && value;
      });
    }
    setFilteredProductList(productlist);
  }, [userDetail?.inquiryfor]);

  const handleAddClient = () => {
    if (
      userDetail.clientName !== "" &&
      (userDetail.email || userDetail.contactNo) &&
      userDetail.reference &&
      userDetail.clientType !== "" &&
      userDetail.state !== "" &&
      userDetail.city !== "" &&
      userDetail.country !== "" &&
      // userDetail.memberId !== "" &&
      userDetail.product.length > 0 &&
      userDetail.inquiryfor !== ""
    ) {
      let clientDetail = {
        name: userDetail.clientName,
        email: userDetail?.email,
        reference: userDetail.reference,
        business: userDetail.business,
        contact_number: userDetail.contactNo,
        client_type: userDetail.clientType,
        state: userDetail.state,
        address: userDetail.address,
        countryId: userDetail.country.id,
        products: [...new Set(userDetail?.product.map((item) => item?.id))],
        // memberId: userDetail.clientName,
        city: userDetail.city,
        memberId: 3,
        reference_name: userDetail?.referenceName,
      };
      debugger
      AddClientDetail(
        clientDetail,
        (res) => {
          navigate("/client")
          setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
        },
        (err) => {
          setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
        }
      );
    }
    else {
      setErrorSnackbar({ ...errorSnackbar, status: true, message: "Please Fill Require Fields" })

    }
  };
  return (
    <>
      <div className="overflow-auto product_list_section css-0 mt-3">
        <div className="p-3">
          <Box className="input_field_row">
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Client Name<span className="required_star">*</span>
              </Typography>
              <TextField
                placeholder="Client Name"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, clientName: e.target.value });
                }}
                value={userDetail.clientName}
                variant="outlined"
              />
            </Box>
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Reference<span className="required_star">*</span>
              </Typography>
              <Select
                value={userDetail.reference}
                onChange={(e) => {
                  setUserDetail({ ...userDetail, reference: e.target.value, referenceName: null });
                }}
              >
                <MenuItem value="INDIAMART">Indiamart</MenuItem>
                <MenuItem value="WEBSITE">Website</MenuItem>
                <MenuItem value="OFFICE">Office</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </Select>
            </Box>
          </Box>
          {userDetail.reference === "OTHER" && <Box className="input_field_row">
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Reference Name:<span className="required_star">*</span>
              </Typography>
              <TextField
                placeholder="Reference Name"
                value={userDetail.referenceName}
                onChange={(e) => {
                  setUserDetail({ ...userDetail, referenceName: e.target.value });
                }}
                variant="outlined"
              />
            </Box>
          </Box>}
          <Box className="input_field_row">
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Contact No:<span className="required_star">*</span>
              </Typography>
              <TextField
                placeholder="Contact No"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, contactNo: e.target.value });
                }}
                value={userDetail.contactNo}
                variant="outlined"
              />
            </Box>
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Client Type<span className="required_star">*</span>
              </Typography>
              <Select
                value={userDetail.clientType}
                onChange={(e) => {
                  setUserDetail({ ...userDetail, clientType: e.target.value });
                }}
              >
                <MenuItem value="true">Domestic</MenuItem>
                <MenuItem value="false">International</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box className="input_field_row">
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Email<span className="required_star">*</span>
              </Typography>
              <TextField
                placeholder="Enter Email"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, email: e.target.value });
                }}
                value={userDetail.email}
                variant="outlined"
              />
            </Box>
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Country<span className="required_star">*</span>
              </Typography>
              <Autocomplete
                options={countryList}
                value={userDetail?.country}
                onChange={(e, value) => {
                  console.log(value);
                  setUserDetail({ ...userDetail, country: value });
                }}
                getOptionLabel={(option) => option?.name}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Country" />
                )}
              />
            </Box>
          </Box>
          <Box className="input_field_row">
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Inquiry for<span className="required_star">*</span>
              </Typography>
              <Select
                value={userDetail.inquiryfor}
                onChange={(e) => {
                  setUserDetail({ ...userDetail, inquiryfor: e.target.value });
                }}
              >
                <MenuItem value="BOTH">Both</MenuItem>
                <MenuItem value="MACHINE">Machine</MenuItem>
                <MenuItem value="PRODUCT">Product</MenuItem>
              </Select>
            </Box>
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                State<span className="required_star">*</span>
              </Typography>
              <TextField
                placeholder="Enter State"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, state: e.target.value });
                }}
                value={userDetail.state}
                variant="outlined"
              />
            </Box>
          </Box>
          <Box className="input_field_row">
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Product<span className="required_star">*</span>
              </Typography>
              <Autocomplete
                limitTags={2}
                filterSelectedOptions
                options={filteredProductList}
                value={userDetail?.product}
                onChange={(e, value) => {
                  console.log(value);
                  setUserDetail({ ...userDetail, product: value });
                  //debugger
                }}
                getOptionLabel={(option) => option?.name}
                // freeSolo
                multiple
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={
                      userDetail?.product.length > 0 ? "" : "Select Product"
                    }
                  />
                )}
              />
            </Box>
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Address
              </Typography>
              <TextField
                autocomplete="off"
                placeholder="Enter Address"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, address: e.target.value });
                }}
                value={userDetail.address}
                variant="outlined"
              />
            </Box>
          </Box>
          <Box className="input_field_row">
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                City<span className="required_star">*</span>
              </Typography>
              <TextField
                placeholder="Enter City"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, city: e.target.value });
                }}
                value={userDetail.city}
                variant="outlined"
              />
            </Box>
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Business
              </Typography>
              <TextField
                placeholder="Enter Business"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, business: e.target.value });
                }}
                value={userDetail.business}
                variant="outlined"
              />
            </Box>
          </Box>
          <Box
            sx={{ justifyContent: "flex-start" }}
            className="input_field_row"
          >
            <Button
              onClick={handleAddClient}
              variant="contained"
              className="edit_page_save_button"
            >
              Save
            </Button>
          </Box>
        </div>
      </div>
      <ErrorSnackbar />
    </>
  );
};

export default AddClient;
