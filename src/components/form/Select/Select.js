import React from "react";

const Select = (props) => {
    const { children, setData, ...inputProps } = props;

    return (
        <select {...inputProps} onChange={(e) => setData(e.target.value)}>{children}</select>
    );
}

export default Select