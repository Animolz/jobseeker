import React from "react";
import { ComapnySidebar } from "./Company.Sidebar";

const CompanyHomePage = () => {
    return (
        <>
            <ComapnySidebar homeActive={true} />
            <div className="h1 element--center"><b>We are working on this page right now!</b></div>
        </>
    );
}

export default CompanyHomePage