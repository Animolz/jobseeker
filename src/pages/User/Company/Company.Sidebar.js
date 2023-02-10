import Sidebar from 'components/layout/Sidebar'
import React from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export const ComapnySidebar = (props) => {
    return (
        <React.Fragment className=''>
            <Sidebar children={(
                        <>
                            <MenuItem active={props?.homeActive} icon={<i className="fa-solid fa-house"></i>}>
                                <Link to='/company/home'>Home</Link>
                            </MenuItem>
                            <MenuItem active={props?.jobsManagementActive} icon={(<i className="fa-solid fa-briefcase"></i>)}>
                                <Link to='/company/jobs-management'>Jobs Management</Link>
                            </MenuItem>
                            <MenuItem active={props?.statisticalActive} icon={(<i className="fa-solid fa-chart-line"></i>)}>Statistical Report</MenuItem>
                            <MenuItem icon={(<i class="fa-solid fa-magnifying-glass"></i>)}>
                                <Link to='/job-detail'>All Jobs</Link>
                            </MenuItem>
                        </>
                    )}
            />
        </React.Fragment>
    );
}
