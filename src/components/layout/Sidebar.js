//import useState hook to create menu collapse state
import React, { Children, useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu
} from "react-pro-sidebar";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import UserInfo from "../common/User/UserInfo";
import "./css/Sidebar.scss";

const Header = (props) => {
  const { children, user } = props;

  return (
    <>
      <div id="header">
        <ProSidebar>
            <SidebarHeader>
                <div className="logotext">
                <Link to='/'><img src="/images/technology.png" alt='Logo'></img></Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                  {children}
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Link to='/edit-profile' id='user-info' className='active'><UserInfo user={user}/></Link>
                <Menu iconShape="square">
                  <MenuItem icon={<i className="fa-solid fa-door-open"></i>}>Logout</MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
