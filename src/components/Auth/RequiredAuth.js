import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthService from "services/AuthService";
import useAuth from "hooks/useAuth";

const RequiredAuth = ({ allowedRole }) => {
    const { auth } = useAuth();
    return (
        auth?.role === allowedRole
            ? <Outlet />
            : !!auth?.accessToken
                ? <Navigate to={'/Unauthorized'} replace={true} />
                : <Navigate to={'/login'} replace={true} />
    );
}

const RequiredLogin = () => {
    const { auth } = useAuth();
    return (
        !!auth?.accessToken
            ? <Outlet />
            : <Navigate to={'/login'} />
    );
}

const RequiredAnonymous = () => {
    const { auth } = useAuth();
    return (
        !!auth.accessToken
            ?   <Navigate to={'/'}  />
            :   <Outlet />
    );
}

export { RequiredAuth, RequiredLogin, RequiredAnonymous }