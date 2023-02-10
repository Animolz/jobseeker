import React from "react";

const JobTitle = (props) => {
    const { job } = props;

    return (
        <div className='job-view__title mb-3'>
            <h3 className="h1"><b>{job.title}</b></h3>
            <span>{job.companyUser.company.companyName}</span><br/>
            <span>{job.province.nameEn}</span>
        </div>
    );
}

export default JobTitle