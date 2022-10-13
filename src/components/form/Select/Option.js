import React from "react";

const Option = (props) => {
    const { label, ...inputProps } = props;

    return (
        <option {...inputProps}>{label}</option>
    );
}

export default Option