import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteUserModal = ({ isOpen, onClose, onDelete, firstName, action}) => {
    const handleDelete = () => {
        onDelete(); 
        onClose();
      };
    
      return (
        <Modal show={isOpen} onHide={onClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{action === 'deactivate' ? 'Деактивиране на Акаунта' : 'Активация на Акаунта'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Сигурни ли сте, че искате да {action === 'deactivate' ? 'деактивирате' : 'активирате'} "{firstName}"?</p>
          </Modal.Body>  
         <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              {action === 'deactivate' ? 'Деактивиране' : 'Активация'}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Затвори
            </Button>
          </Modal.Footer>
        </Modal>
      );
}

export default DeleteUserModal