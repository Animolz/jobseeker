import React from "react";
import './css/form.scss';

const SubmitButton = (props) => {
    const { className, onClick, ...inputProps } = props;

    return (
        <React.Fragment>
            <div className="submit-btn__container">
                <button className={`submit-btn__button ${className}`}  type="submit" onClick={onClick}>
                    <input {...inputProps}  type="button" name="submit" className="submit-btn__input"/>
                </button>
            </div>
        </React.Fragment>
    );
}

export default SubmitButton