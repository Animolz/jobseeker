import React from "react";

export const NoValue = ({ value }) => {
    return (
        !!value 
            ? <>{value}</>
            : 'Nothing to display'
    );
}