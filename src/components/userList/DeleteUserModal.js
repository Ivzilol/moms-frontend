import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteUserModal = ({ isOpen, onClose, onDelete, firstName}) => {
    const handleDelete = () => {
        onDelete(); 
        onClose();
      };
    
      return (
        <Modal show={isOpen} onHide={onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Деактивиране на Акаунта</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Сигурни ли сте, че изкате да деактивирате"{firstName}"?</p>
          </Modal.Body>  
         <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              Деактивиране
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Затвори
            </Button>
          </Modal.Footer>
        </Modal>
      );
}

export default DeleteUserModal