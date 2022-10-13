import React, { Component } from "react";
import { Image } from "react-bootstrap";

const UserAvatar = (props) => {
    const { avatar, username } = props;

    return(
        <Image src={avatar} alt={username} className="rounded-circle"></Image>
    )
}  

export default UserAvatar