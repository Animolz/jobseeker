import React from "react";
import AvatarInit from "utils/AvatarInit";

const UserInfo = (props) => {
    const { user } = props; 

    return(
        <React.Fragment>
                <AvatarInit avatar={user?.avatar} size={50} round={true} name={user?.username} border='border' />
                <p className="mb-0 ml-3">{user?.username}</p>
        </React.Fragment>
    )
}

export default UserInfo