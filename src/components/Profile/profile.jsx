import React, { useEffect, useState, } from "react";
import "./index.css";
import Header from "../Header/Header";
const Profile = () => {
  const [pathName, setPathName] = useState("");
  useEffect(() => {
    let path = window.location.pathname;
    setPathName(path);
    console.log("Printing Path of ", path);
  });
  return (
    <>
      <Header />
    </>
  );
};

export default Profile;
