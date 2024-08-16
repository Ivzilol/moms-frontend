import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import styles from './EditUserModal.module.css'

const EditUserModal = ({ isOpen, onClose, user, onSave, fieldErrors }) => {
  const [editedUser, setEditedUser] = useState({...user});

  useEffect(() => {
    if (user) {
      setEditedUser({...user});
      console.log ( user)
      console.log(editedUser + " user to edit")
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (Object.keys(fieldErrors).length === 0) {
    //   onSave(editedUser);
    //   onClose(); 
    // }
    onSave(editedUser);
    onClose();
    
  };

  const hasErrors = Object.keys(fieldErrors).length > 0;

  const roles = ['USER', 'ADMIN', 'SUPERADMIN'];
  const roleDisplayNames = {
    'USER': 'Потребител',
    'ADMIN': 'Администратор',
    'SUPERADMIN': 'Модератор',
  };
  const currentRole = user && user.roles && user.roles.length > 0 ? user.roles[0] : '';
  const availableRoles = roles.filter((role) => role !== currentRole);

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
            <label htmlFor="role" className={styles.form_label}>Ниво на достъп:</label>
            <select
              id="role"
              name="roles"
              className={`form-control ${fieldErrors.roles ? 'is-invalid' : ''}`}
              value={currentRole}
              onChange={(e) => {
                setEditedUser((prev) => ({
                  ...prev,
                  roles: [e.target.value],
                }));
              }}
            >
              <option value={currentRole} disabled>
                {roleDisplayNames[currentRole]}
              </option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {roleDisplayNames[role]}
                </option>
              ))}
            </select>
            {fieldErrors.roles && (
              <div className="invalid-feedback">
                {fieldErrors.roles}
              </div>
            )}
        </div>

          <div className={styles.button_container}>
            <Button type="submit" variant="success" className={styles.btn_success_modal} >
              Запази 
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} className={styles.btn_close}>
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
