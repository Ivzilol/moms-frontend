import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const ConfirmRegisterModal = ({ show, handleClose, handleConfirm, userInfo }) => {
  return (
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Потвърдете Регистрацията</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Потребител с име {userInfo.firstName} {userInfo.lastName}, имейл {userInfo.email} и телефон {userInfo.phoneNumber} ще бъде създаден.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отказ
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Потвърдете
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default ConfirmRegisterModal;