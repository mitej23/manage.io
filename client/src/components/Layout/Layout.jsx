import React from "react";
import SideMenu from "../SideMenu/SideMenu";
import "./Layout.styles.css";

const Layout = (props) => {
  return (
    <div className="page">
      <SideMenu />
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Layout;
