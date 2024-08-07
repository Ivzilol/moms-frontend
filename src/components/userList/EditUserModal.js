import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import styles from './EditUserModal.module.css'

const EditUserModal = ({ isOpen, onClose, user, onSave, fieldErrors }) => {
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser);
    onClose(); // Close modal after saving
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered className={styles.modal_container}>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <div className="mb-3">
            <label htmlFor="firstName" className={styles.form_label}>Първо Име:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`form-control ${fieldErrors.firstName ? 'is-invalid' : ''}`}
              value={editedUser.firstName || ''}
              onChange={handleChange}
              placeholder="Въведете име"
            />
            {fieldErrors.firstName && (
              <div className="invalid-feedback">
                {fieldErrors.firstName}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className={styles.form_label}>Фамилия:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={`form-control ${fieldErrors.lastName ? 'is-invalid' : ''}`}
              value={editedUser.lastName || ''}
              onChange={handleChange}
              placeholder="Въведете фамилия"
            />
            {fieldErrors.lastName && (
              <div className="invalid-feedback">
                {fieldErrors.lastName}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className={styles.form_label}>Имейл:</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
              value={editedUser.email || ''}
              onChange={handleChange}
              placeholder="Въведете Имейл"
            />
            {fieldErrors.email && (
              <div className="invalid-feedback">
                {fieldErrors.email}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className={styles.form_label}>Телефонен Номер:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className={`form-control ${fieldErrors.phoneNumber ? 'is-invalid' : ''}`}
              value={editedUser.phoneNumber || ''}
              onChange={handleChange}
              placeholder="Въведете телефонен номер"
            />
            {fieldErrors.phoneNumber && (
              <div className="invalid-feedback">
                {fieldErrors.phoneNumber}
              </div>
            )}
          </div>

          <div className={styles.button_container}>
            <Button type="button" variant="success" className={styles.button_success}>
              Запази 
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} >
              Затвори
            </Button>
          </div>
        </form>
    </Modal>
  );
};

EditUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  fieldErrors: PropTypes.object,
};

export default EditUserModal;
