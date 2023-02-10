import React from "react";
import Avatar from "react-avatar";

const AvatarInit = (props) => {
    return (
        props?.avatar
            ? <Avatar src={props?.avatar} size={props?.size} round={props?.round} alt={props?.name} className={`${props.border}`} />
            : <Avatar name={props?.name}  size={props?.size} round={props?.round} colors={['red', 'green', 'blue']} />
    );
}

export default AvatarInit