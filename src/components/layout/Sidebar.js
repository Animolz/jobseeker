//import useState hook to create menu collapse state
import React, { Children, useMemo, useState } from "react";

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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "services/AuthService";
import UserInfo from "../common/User/UserInfo";
import "./css/Sidebar.scss";

import useAuth from "hooks/useAuth";

const Header = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();

  const logoutHandling = () => {
    if(auth?.accessToken){
        sessionStorage.clear();
        setAuth({});
        toast.success('Logout successfully!');
        if(location?.pathname == '/edit-profile'){
            navigate('/login', { replace: true });
        }
        else{
          navigate('/', { replace: true });
        }
    }
    else{
        toast.error('Logout failed!');
    }
  }

  return (
    <>
      <div id="header" className={props.className}>
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
                <Link to='/company/edit-profile' id='user-info' className='active'><UserInfo user={auth}/></Link>
                <Menu iconShape="square">
                  <MenuItem icon={<i className="fa-solid fa-door-open"></i>} onClick={logoutHandling}>Logout</MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
