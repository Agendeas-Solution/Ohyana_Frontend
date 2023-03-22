import { React, useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "../../assets/img/Ohyana_logo.png";
import { Context as ContextActivePage } from "../../context/pageContext";
import backButton from "../../assets/img/back.svg";
import "./index.css";
const Header = () => {
  const { ActivePage } = useContext(ContextActivePage)?.state;
  const navigate = useNavigate();
  const [pathName, setPathName] = useState("");
  useEffect(() => {
    let path = window.location.pathname;
    setPathName(path);
    console.log("Printing Path of ", path);
  });
  const prevRoute = useLocation();
  const handleGoback = () => {
    navigate(-1);
  };
  return (
    <>
      <Box
        className={pathName === "/login" ? "login_page_section" : "header_root"}
      >
        <Box className="header-info mx-4">
          <Box className="user_profile_photo_root">
            <Box className="align-items-center d-flex">
              <Box onClick={() => handleGoback()}>
                <img className="ms-2" src={backButton} />
              </Box>
              <h3 className="mb-0">{ActivePage}</h3>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
      </Box>
    </>
  );
};

export default Header;
