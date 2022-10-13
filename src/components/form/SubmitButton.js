import React from "react";
import './css/form.scss';

const SubmitButton = (props) => {
    const { className, ...inputProps } = props;

    return (
        <React.Fragment>
            <div className="submit-container">
                <button className={`submit-button ${className}`}  type="submit">
                    <input {...inputProps}  type="button" name="submit" className="button"/>
                </button>
            </div>
        </React.Fragment>
    );
}

export default SubmitButton