import React, { useState } from "react";
import './css/Modal.scss'
import { Button, Modal } from "react-bootstrap";

const ModalView = (props) => {
    const { title, content, variant, size, btnValue, btnSize, ...inputProps } = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant={variant} onClick={handleShow} size={btnSize}>
                {props.icon}{btnValue}
            </Button>

            <Modal show={show} onHide={handleClose} size={size} {...inputProps}>
                <Modal.Header>
                <Modal.Title className="w-100">{title}<button className="position-absolute button-close" onClick={handleClose}></button></Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalView