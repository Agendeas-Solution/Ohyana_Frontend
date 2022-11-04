import React, { useEffect, useState,useContext } from "react";
import { Box, Tabs, Tab, FormControl, Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TabPanel from "@mui/lab/TabPanel";
import { useNavigate } from "react-router-dom";
import { GetAdminDepartmentList } from "../../services/apiservices/adminprofile";
import AddEditDepartmentDialog from "./AddEditDepartmentDialog";
import SuccessSnackbar from "../SuccessSnackbar/SuccessSnackbar";
import { Context as AuthContext } from "../../context/authContext/authContext";

const DepartmentList = () => {
  let navigate = useNavigate();
  const { flagLoader, permissions } = useContext(AuthContext).state;
  const [AdminDepartmentList, setAdminDepartmentList] = useState([]);
  const [addEditDepartmentDialogControl, setAddEditDepartmentDialogControl] =
    useState(false);
  useEffect(() => {
    GetAdminDepartmentList(
      {},
      (res) => {
        if (res.status === 200) {
          setAdminDepartmentList(res?.data?.department);
        }
      },
      (err) => {
        console.log("Printing Error", err);
      }
    );
  }, [addEditDepartmentDialogControl]);
  const handleClose = () => {
    setAddEditDepartmentDialogControl(false);
  };

  return (
    <>
      <div className="add_product_button py-3">
        <Typography variant="span">All Department</Typography>
        {permissions?.editDepartment && <Button
          onClick={() => {
            setAddEditDepartmentDialogControl({
              ...addEditDepartmentDialogControl,
              status: true,
            });
          }}
          // variant="contained"
          className="main_button"
        >
          + Add Department
        </Button>}
      </div>
      <Box className="product_list_section bg-body">
        <Box>
          {AdminDepartmentList.map((row) => {
            return (
              <Box
                onClick={() => navigate(`/department/${row.id}`)}
                className="setting_cards"
              >
                <Typography variant="span">{row.name}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
      <AddEditDepartmentDialog
        addEditDepartmentDialogControl={addEditDepartmentDialogControl}
        handleClose={handleClose}
      />
    </>
  );
};

export default DepartmentList;
