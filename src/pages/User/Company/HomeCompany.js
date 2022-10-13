import React from "react";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Sidebar from '../../../components/layout/Sidebar'

const user = ({
    "id" : 1,
    "username": "Animolz",
    "avatar": "/images/male_avatar.jpg"
})

const HomeCompany = () => {
    return (
        <>
            <Sidebar children={(
                    <>
                        <MenuItem active icon={<i className="fa-solid fa-house"></i>}>
                            <Link to='/company/home'>Home</Link>
                        </MenuItem>
                        <MenuItem icon={(<i className="fa-solid fa-briefcase"></i>)}>
                            <Link to='/company/jobs-management'>Jobs Management</Link>
                        </MenuItem>
                        <MenuItem icon={(<i className="fa-solid fa-chart-line"></i>)}>Statistical Report</MenuItem>
                    </>
                    )}
                    user={user}
            />
        </>
    );
}

export default HomeCompany