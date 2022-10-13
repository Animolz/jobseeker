import React from "react";

const Text = (props) => {
    return (
        <div className={`m-1 ${props.className}`}>
                <span className="txt1">{props.value}</span>
        </div>
    )
} 

export default Text