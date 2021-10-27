import React from "react";
import SideMenu from "../SideMenu/SideMenu";
import "./Layout.styles.css";

const Layout = (props) => {
  console.log(props.children);
  return (
    <div className="page">
      <SideMenu />
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Layout;
