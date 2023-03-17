import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import "./index.css";
import DepartmentIcon from "../../assets/img/department_icon.svg";
import ProductIcon from "../../assets/img/Product.svg";
import { useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../../context/authContext/authContext";
import Poll from '../../assets/img/Poll.svg'
const Settings = () => {
  const { flagLoader, permissions } = useContext(AuthContext).state;
  const navigate = useNavigate();
  return (
    <>
      <Box className="main_section mt-4">
        <Box
          className="setting_cards-list"
          onClick={() => {
            navigate("/companyprofile");
          }}
        >
          <img
            className="department_icon"
            src={ProductIcon}
            alt="ProductIcon"
          />
          <Typography variant="span">Company Profile</Typography>
        </Box>
        {permissions?.viewDepartment && <Box
          className="setting_cards-list"
          onClick={() => {
            navigate("/departmentlist");
          }}
        >
          <img
            className="department_icon"
            src={DepartmentIcon}
            alt="department_icon"
          />
          <Typography variant="span">Team Role</Typography>
        </Box>}
        {permissions?.viewProduct
          && <Box
            className="setting_cards-list"
            onClick={() => {
              navigate("/productlist");
            }}
          >
            <img
              className="department_icon"
              src={ProductIcon}
              alt="ProductIcon"
            />
            <Typography variant="span">Product</Typography>
          </Box>}
        <Box
          className="setting_cards-list"
          onClick={() => {
            navigate("/premium");
          }}
        >
          <img
            className="department_icon"
            src={ProductIcon}
            alt="ProductIcon"
          />
          <Typography variant="span">Premium</Typography>
        </Box>
        <Box
          className="setting_cards-list"
          onClick={() => {
            navigate("/leaveholidaymanagement");
          }}
        >
          <img
            className="department_icon"
            src={ProductIcon}
            alt="DepartmentIcon"
          />
          <Typography variant="span">Leave & Holiday</Typography>
        </Box>
        <Box
          className="setting_cards-list"
          onClick={() => {
            navigate("/poll");
          }}
        >
          <img
            className="department_icon"
            src={Poll}
            alt="Poll Icon"
          />
          <Typography variant="span">Poll</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
