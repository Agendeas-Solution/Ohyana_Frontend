import React, { useEffect, useState, lazy} from "react";
import "./index.css";
const Header = React.lazy(() => import("../Header/Header"));
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
