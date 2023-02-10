import React from "react";
import './css/JobView.scss'
import { NoValue } from "../NoValue";

const JobBrief = (props) => {
    const { job } = props

    return (
        <div className='job-view__brief mt-4 mb-3'>
            <div className='d-flex'>
                <p className=''><i className="fa-solid fa-people-line mr-2"></i>{job.position.name}</p>
                <p className=''><i className="fa-solid fa-money-bill mr-2"></i>{!!job?.salary ? `${job?.salary} $` : 'Negotiable Salary' } </p>
            </div>
            <div className='d-flex'>
                <p className=''><i className="fa-solid fa-business-time mr-2"></i>{job.jobType.name}</p>
                <p className=''><i className="fa-solid fa-building mr-2"></i>{job.jobCategory.name}</p>
            </div>
            <p className=''><i className="fa-solid fa-location-dot text-success mr-2"></i><NoValue value={job.location} /></p>
        </div>
    );
}

export default JobBrief