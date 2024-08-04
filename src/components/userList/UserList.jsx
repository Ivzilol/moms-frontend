import React, { useState, useEffect } from 'react';
import ajax from '../../service/FetchService';
import {useUser} from "../../userProvider/UserProvider";
import {useNavigate} from "react-router-dom";
import styles from './UserList.module.css';
import { host, endpoints } from '../../core/environments/constants'

import DeleteUserModal from './DeleteUserModal';
import EditUserModal from './EditUserModal';

const UserList = ({ users }) => {

  const user = useUser();
  const navigate = useNavigate();

      // Delete user modal implementation
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);

      const [isEditModalOpen, setIsEditModalOpen] = useState(false);
      const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
      const [fieldErrors, setFieldErrors] = useState({});
  
      const handleShowDeleteModal = (user) => {
        setSelectedUserForDelete(user);
        setIsDeleteModalOpen(true);
      };
  
      const handleHideDeleteModal = () => {
        setSelectedUserForDelete(null);
        setIsDeleteModalOpen(false);
      };

      const handleDeleteUser = (e) => {
        e.preventDefault();
        // Your delete logic here
        console.log('User deleted');
        handleHideDeleteModal();
      };

      // edit Modal

      const handleShowEditModal = (user) => {
        setSelectedUserForEdit(user);
        setIsEditModalOpen(true);
      };
    
      const handleHideEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUserForEdit(null);
      };
    
      const handleSaveUser = (editedUser) => {
        // Example: Validate fields and set fieldErrors if necessary
        const errors = {};
        if (!editedUser.firstName) {
          errors.firstName = 'First Name is required';
        }
        if (!editedUser.lastName) {
          errors.lastName = 'Last Name is required';
        }
        if (!editedUser.phoneNumber) {
          errors.phoneNumber = 'Phone Number is required';
        }
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
        } else {
          // Perform save operation here
          console.log('User saved', editedUser);
          setFieldErrors({});
          handleHideEditModal();
        }
      };

  return (
    
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Име</th>
                <th scope="col">Фамилия</th>
                <th scope="col">Имейл</th>
                <th scope="col">Роля</th>
                <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>юзър</td>
                  <td className={styles.button_wrapper}>
                      <button 
                        className={`btn btn-warning mb-1 ml-2 ${styles.button_customize}`}
                        onClick={() => handleShowDeleteModal({ firstName: 'Jacob' })}
                      >
                        Деактивирай
                      </button>
                      <button type='button' 
                              className={`btn btn-primary mb-1 ${styles.button_customize}`}
                              onClick={() => handleShowEditModal({ firstName: 'Jacob', lastName: 'Thornton', phoneNumber: '123456789' })}>
                                Редактирай
                      </button>
                  </td>
                </tr>
                {/* <tr>
                <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>юзър</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-warning btn-sm me-1">Деактивирай</button>
                      <button className="btn btn-primary btn-sm">Редактирай</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                  <td>юзър</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-warning btn-sm me-1">Деактивирай</button>
                      <button className="btn btn-primary btn-sm">Редактирай</button>
                    </div>
                  </td>
                </tr> */}
            </tbody>

        </table>

        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={handleHideDeleteModal}
          onDelete={handleDeleteUser}
          firstName={selectedUserForDelete?.firstName}
        />

        {selectedUserForEdit && (
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={handleHideEditModal}
            user={selectedUserForEdit}
            onSave={handleSaveUser}
            fieldErrors={fieldErrors}
          />
        )}

    </div>
  )
}

export default UserList;