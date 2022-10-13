import React from "react";

const JobDescription = (props) => {
    const { job } = props;

    return (
        <div className='description m-0'>
            <h4>About our company</h4>
            <p>{job.companyUser.company.introduction}</p>
            <h4>Job Description</h4>
            <p>{job.description}</p>
            <h4>Job Requirements</h4>
            <ul>
                {job.requirements.map((req, index) => (
                    <li key={index}>{req.content}</li>
                ))}
            </ul>
            <h4>Contact us</h4>
            <p className='m-0'>Tel: {job.companyUser.company.contactTel}</p>
            <p className='m-0'>Email: {job.companyUser.company.contactEmail}</p>
            <p className='m-0'>Website: <a href={job.companyUser.company.link} target='_blank'>{job.companyUser.company.link}</a></p>
        </div>
    );
}

export default JobDescription