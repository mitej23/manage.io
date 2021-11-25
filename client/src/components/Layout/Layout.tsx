import React from "react";
import SideMenu from "../SideMenu/SideMenu";
import "./Layout.styles.css";

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="page">
      <SideMenu />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
