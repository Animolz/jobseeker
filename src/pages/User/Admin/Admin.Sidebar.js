import Sidebar from 'components/layout/Sidebar'
import React from 'react';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import './css/AdminSidebar.scss'

export const AdminSidebar = (props) => {
    return (
        <React.Fragment className='admin-sidebar'>
            <Sidebar className='admin-sidebar' children={(
                <>
                    <MenuItem active={props?.homeActive} icon={<i className="fa-solid fa-house"></i>}>
                        <Link to='/admin/home'>Home</Link>
                    </MenuItem>
                    <MenuItem active={props?.jobManagementActive} icon={<i class="fa-solid fa-briefcase"></i>}>
                        <Link to='/admin/jobs-management'>Jobs Management</Link>
                    </MenuItem>
                    <MenuItem active={props?.candidateManagementActive} icon={<i className="fa-solid fa-user"></i>}>
                        <Link to='/admin/candidates-management'>Candidates Management</Link>
                    </MenuItem>
                    <MenuItem active={props?.companyManagementActive} icon={(<i className="fa-solid fa-building"></i>)}>
                        <Link to='/admin/companies-management'>Companies Management</Link>
                    </MenuItem>
                    <SubMenu icon={<i class="fa-solid fa-chart-simple"></i>} title='Stat' >
                        <SubMenu title='Jobs Stat'>
                            <MenuItem active={props?.jobByCategory}><Link to={'/admin/stat/job/by-category'}>By Category</Link></MenuItem>
                            <MenuItem active={props?.jobByPosition}><Link to={'/admin/stat/job/by-position'}>By Position</Link></MenuItem>
                            <MenuItem active={props?.jobByJobType}><Link to={'/admin/stat/job/by-job-type'}>By Job Type</Link></MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <MenuItem icon={(<i class="fa-solid fa-magnifying-glass"></i>)}>
                        <Link to='/job-detail'>All Jobs</Link>
                    </MenuItem>
                </>
                )}
            />
        </React.Fragment>
    );
}
