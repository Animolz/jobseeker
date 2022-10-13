import React from "react";

const JobTitle = (props) => {
    const { job } = props;

    return (
        <div className='title mb-2'>
            <h3><strong>{job.title}</strong></h3>
            <span>{job.companyUser.company.companyName}</span><br/>
            <span>{job.province.nameEn}</span>
        </div>
    );
}

export default JobTitle