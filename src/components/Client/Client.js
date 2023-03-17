import { React, useEffect, useState, useContext } from "react";
import {
  Tabs,Tab,Box,FormControlLabel,Autocomplete,TextField,Pagination,Button, Dialog,DialogActions,
  Typography, Checkbox, FormControl, OutlinedInput, InputAdornment
} from "@mui/material";
import "./index.css";
import { socket } from '../../App'
import DeleteIcon from '../../assets/img/delete.png'
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { GetAdminClientDetail, DeleteClientDetail } from "../../services/apiservices/clientDetail";
import { Context as ContextSnackbar } from "../../context/pageContext";
import { Context as AuthContext } from "../../context/authContext/authContext";
import moment from "moment";
import Loader from "../Loader/Loader";
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterIcon from '../../assets/img/Filter.svg'
import { styled, useTheme } from '@mui/material/styles';
import CustomerList from "./CustomerList";
import BusinessCard from "./BusinessCard";
const drawerWidth = 240;

const Client = () => {
  const theme = useTheme();
  // const socket = io("http://159.89.165.83", { transports: ["websocket"] });
  const [value, setValue] = useState("Telephony");
  const navigate = useNavigate();
  const { flagLoader, permissions } = useContext(AuthContext).state;
  const { setFlagLoader } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalResult, setTotalresult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInternational, setIsInternational] = useState(null);
  const { successSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar } = useContext(ContextSnackbar);
  const [deleteClientDialogControl, setDeleteClientDialogControl] = useState({
    status: false,
    clientId: null,
  });
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const [clientLoader, setClientLoader] = useState(false)
  const [clientType, setClientType] = useState([
    { stage: "intiate", id: 0 },
    { stage: "no response", id: 1 },
    { stage: "irrelevant", id: 2 },
    { stage: "inter-mediate", id: 3 },
    { stage: "confirm", id: 4 },
  ]);
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log(clientType);
    let value = clientType.filter((data) => {
      if (data.id <= permissions?.clientStageAccess) {
        return data;
      }
    })
    setClientType(value);
  }, [])
  const [clientStage, setClientStage] = useState();
  const handleClientDelete = () => {
    DeleteClientDetail(deleteClientDialogControl.clientId, (res) => {
      setDeleteClientDialogControl({ ...deleteClientDialogControl, status: false })
      setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
    }, (err) => {
      //debugger
    })
  }
  const handleDialogClose = () => {
    setDeleteClientDialogControl({ ...deleteClientDialogControl, status: false })
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrentPage(1);
  };
  const ViewClientDetail = (id) => {
    navigate(`/clientprofile/${id}`);
  };
  useEffect(() => {
    // socket.on('connect', (connection) => {
    // socket.on("client_list", (data) => {
    //     console.log("Printing Connections", data);
    //     GetAdminClientDetail(
    //       data,
    //       (res) => {
    //         if (res?.status === 200) {
    //           setClientDetails(res?.data.client);
    //         }
    //       },
    //       (err) => {
    //         console.log(err);
    //       }
    //     );
    //   });
    // });
    // return () => socket.disconnect();
    // const socket = io("http://159.89.165.83");
    socket.on("client_list", (data) => {
      console.log("Printing Connections", data);
      //debugger;
      GetAdminClientDetail(
        data,
        (res) => {
          if (res?.status === 200) {
            setClientDetails(res?.data.client);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
    return () => {
      socket.disconnect();
    }
  }, [])

  useEffect(() => {
    let data = { page: currentPage, size: rowsPerPage };
    if (value !== "All") {
      data["type"] = value;
    }
    if (isInternational !== null) {
      data["isInternational"] = isInternational;
    }
    if (value === "PJP") {
      data["pjp"] = true;
    }
    data["stage"] = clientStage;
    setClientLoader(true)
    GetAdminClientDetail(
      data,
      (res) => {
        if (res?.status === 200) {
          setTotalresult(res?.data?.total);
          setClientDetails(res?.data.client);
          let pages =
            res?.data?.total > 0
              ? Math.ceil(res?.data?.total / rowsPerPage)
              : null;
          setNumbersToDisplayOnPagination(pages);
          setClientLoader(false)
        }
      },
      (err) => {
        console.log(err);
        setClientLoader(false)
      }
    );
  }, [currentPage, isInternational, value, clientStage, deleteClientDialogControl.status]);
  return (
    <>
      {clientLoader && <Loader />}
      <Box className="client_section">
        <Box className="notification_tabs_root align-items-center d-flex">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {/* <Tab value="All" label="All" /> */}
            <Tab value="Telephony" label="Telephony" />
            <Tab value="PJP" label="From PJP" />
            <Tab value="BusinessCard" label="Business Card" />
            <Tab value="Projected" label="Projected" />
            <Tab value="Regular" label="Regular" />
            <Tab value="OTHER" label="Other" />
          </Tabs>
          <div className="d-flex">
            <FormControl variant="outlined">
              <OutlinedInput
                className="search_field"
                placeholder='Search Here...'
                startAdornment={
                  <InputAdornment position="start"
                  >
                    <IconButton
                    >
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {permissions?.editClient && <Button
              className="main_button"
              onClick={() => {
                navigate("/addclient");
              }}
            >
              <AddRoundedIcon />
              New Clients
            </Button>}
            <Toolbar>
              <IconButton
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
              >
                <img src={FilterIcon} alt="" />
              </IconButton>
            </Toolbar>
            <Drawer
              sx={{
                width: 2,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                },
              }}
              variant="persistent"
              anchor="right"
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <FormControlLabel checked={isInternational === false ? !isInternational : null}
                onChange={(e) => {
                  if (e.target.checked === true) {
                    setIsInternational(false);
                  }
                  else {
                    setIsInternational(null);
                  }
                }} control={<Checkbox className="check_box_color" />} label="Domestic" />
              <FormControlLabel checked={isInternational === true ? isInternational : null} onChange={(e) => {
                if (e.target.checked === true) {
                  setIsInternational(true);
                }
                else {
                  setIsInternational(null);
                }
              }} control={<Checkbox className="check_box_color" />} label="International" />
              <Autocomplete
                className="align-items-center d-flex justify-content-center me-2"
                options={clientType}
                value={clientStage !== null ? clientType[clientStage] : null}
                sx={{ width: 200 }}
                onChange={(e, value) => {
                  console.log(value);
                  setClientStage(value?.id);
                }}
                getOptionLabel={(option) => option.stage}
                renderInput={(params) => (
                  <TextField className="client_type_select" {...params} placeholder="Select Client Type" />
                )}
              />
            </Drawer>
          </div>
        </Box>
        <Box>
          {value === "Telephony" ? <CustomerList clientDetails={clientDetails} ViewClientDetail={ViewClientDetail} /> : null}
          {value === "PJP" ? <CustomerList clientDetails={clientDetails} ViewClientDetail={ViewClientDetail} /> : null}
          {value === "BusinessCard" ? <BusinessCard /> : null}
          <Pagination
            className="mt-3"
            boundaryCount={0}
            siblingCount={0}
            size="small"
            shape="rounded"
            count={numbersToDisplayOnPagination}
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value);
            }}
          />
        </Box >
      </Box >
      <Dialog
        open={deleteClientDialogControl.status}
        onClose={handleDialogClose}
      >
        <Box className="client_appointment_dialog">
          <Box className="client_appointment_content">
            <img style={{ width: "60px", height: "60px" }} src={DeleteIcon} alt="" />
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              Delete Client
            </Typography>
            <Typography
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              variant="span"
            >
              Are You Sure you want to Delete this Client ?
            </Typography>
          </Box>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleClientDelete}
              autoFocus
            >
              Ok
            </Button>
            <Button
              className="cancel-btn"
              onClick={handleDialogClose}
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );

};

export default Client;
