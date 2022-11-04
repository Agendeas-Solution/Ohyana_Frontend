import { React, useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import {
  GetAdminProductList,
  EditClientDetail,
} from "../../services/apiservices/adminprofile";
import {
  GetAdminClientProfileDetail,
  GetCountryList,
} from "../../services/apiservices/clientDetail";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { Context as ContextSnackbar } from "../../context/pageContext";
import SuccessSnackbar from "../SuccessSnackbar/SuccessSnackbar";
const EditClient = () => {
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
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [successDialog, setSuccessDialog] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const navigate = useNavigate();
  const { successSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext(ContextSnackbar);
  const handleChange = (prop) => (event) => {
    setUserDetail({ ...userDetail, [prop]: event.target.value });
  };

  useEffect(() => {
    let path = window.location.pathname;
    path = path.split("/").pop();
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
    GetAdminClientProfileDetail(
      parseInt(path),
      (res) => {
        if (res.status === 200) {
          setUserDetail({
            ...userDetail,
            clientName: res.data.name,
            reference: res.data.reference,
            email: res.data.email,
            contactNo: res.data.contact_number,
            clientType: res.data.client_type,
            country: res.data.country,
            state: res.data.state,
            product: res.data.products,
            address: res.data.address,
            city: res.data.city,
            business: res.data.business,
            clientType: res.data.isInternational.toString(),
            referenceName:res.data.reference_name
          });
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const EditClient = () => {
    if (
      userDetail.clientName !== "" &&
      (userDetail.email || userDetail.contactNo) &&
      userDetail.reference &&
      userDetail.clientType !== "" &&
      userDetail.state !== "" &&
      userDetail.city !== "" &&
      userDetail.memberId !== "" &&
      userDetail.product.length > 0 &&
      userDetail.inquiryfor !== "" &&
      userDetail.country
    ) {
      let clientDetail = {
        name: userDetail.clientName,
        email: userDetail.email,
        reference: userDetail.reference,
        business: userDetail.business,
        contact_number: userDetail.contactNo,
        client_type: userDetail.clientType,
        state: userDetail.state,
        address: userDetail.address,
        countryId: userDetail.country?.id,
        products: [...new Set(userDetail?.product.map((item) => item?.id))],
        memberId: userDetail.clientName,
        city: userDetail.city,
        memberId: 3,
        reference_name: userDetail?.referenceName
      };
      debugger;
      let path = window.location.pathname;
      console.log("Printing Path of ", path);
      console.log("Printing ", path.split("/").pop());
      path = path.split("/").pop();
      EditClientDetail(
        path,
        clientDetail,
        (res) => {
          if (res.status === 200) {
            navigate(`/clientprofile/${path}`);
            //debugger;
            setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
          }
        },
        (err) => {
          //debugger
        }
      );
    }
  };
  return (
    <>
      <div>
        <Box className="bg-body mt-4 p-3">
          <Box className="input_field_row">
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Client Name
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
                Reference
              </Typography>
              <Select
                value={userDetail.reference}
                onChange={(e) => {
                  setUserDetail({ ...userDetail, reference: e.target.value });
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
                onChange={(e) => {
                  setUserDetail({ ...userDetail, referenceName: e.target.value });
                }}
                value={userDetail.referenceName}
                variant="outlined"
              />
            </Box>
          </Box>}
          <Box className="input_field_row">
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Contact No.
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
                Client Type
              </Typography>
              <Select
                value={userDetail.clientType}
                onChange={(e) => {
                  setUserDetail({ ...userDetail, clientType: e.target.value });
                }}
              >
                <MenuItem value="false">Domestic</MenuItem>
                <MenuItem value="true">International</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box className="input_field_row">
            <Box className="input_fields">
              <Typography className="input_field_label" variant="span">
                Email
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
                Country
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
                Inquiry for
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
                State
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
                Product
              </Typography>
              <Autocomplete
                limitTags={2}
                filterSelectedOptions
                options={filteredProductList}
                value={userDetail?.product}
                onChange={(e, value) => {
                  console.log(value);
                  setUserDetail({ ...userDetail, product: value });
                }}
                getOptionLabel={(option) => option?.name}
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
                City
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
              onClick={EditClient}
              variant="contained"
              className="edit_page_save_button"
            >
              Save
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default EditClient;
