import { React, useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "../../assets/img/Ohyana_logo.png";
import { Context as ContextActivePage } from "../../context/pageContext";
import backButton from "../../assets/img/back.svg";
import "./index.css";
const Header = () => {
  const { ActivePage } = useContext(ContextActivePage)?.state;
  const { setActivePage } = useContext(ContextActivePage);
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
        <div className="header-info mx-4">
          <div className="user_profile_photo_root">
            <div className="align-items-center d-flex">
              <div onClick={() => handleGoback()}>
                <img className="ms-2" src={backButton} />
              </div>
              <h3 className="mb-0">{ActivePage}</h3>
            </div>
            {/* <img onClick={() => {
              navigate("/profile")
              // window.location.reload(false);
            }} src={CompanyLogo} alt="user_profile" /> */}
          </div>
        </div>
      </Box>
      <Box> </Box>
    </>
  );
};

export default Header;
