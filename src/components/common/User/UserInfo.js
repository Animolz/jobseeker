import React from "react";
import UserAvatar from "./UserAvatar";

const UserInfo = (props) => {
    const { user } = props; 

    return(
        <React.Fragment>
                <UserAvatar avatar={user.avatar} username={user.username} />
                <p className="m-0 ml-2">{user.username}</p>
        </React.Fragment>
    )
}

export default UserInfo