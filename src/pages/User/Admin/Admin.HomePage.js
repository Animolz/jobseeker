import React from "react";
import { AdminSidebar } from "./Admin.Sidebar";

const AdminHomePage = () => {
    return (
        <>
            <AdminSidebar homeActive={true} />
            <div className="h1 element--center"><b>We are working on this page right now!</b></div>
        </>
    );
}

export default AdminHomePage