import React, { useState, useEffect } from 'react';
import ajax from '../../service/FetchService';
import {useUser} from "../../userProvider/UserProvider";
import {useNavigate} from "react-router-dom";
import styles from './UserList.module.css';
import { host, endpoints } from '../../core/environments/constants'

import DeleteUserModal from './DeleteUserModal';
import EditUserModal from './EditUserModal';

const UserList = () => {

  const user = useUser();
  const navigate = useNavigate();

      // Delete user modal implementation
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);

      const [isEditModalOpen, setIsEditModalOpen] = useState(false);
      const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
      const [fieldErrors, setFieldErrors] = useState({});

      const [users, setUsers] = useState([]);

    //  Handle the API requests from the BE (get users, edit status)
      const getUsers = async () => {
        try {
            const allUsers = await ajax(host + endpoints.getAllUsers, 'GET', user.jwt);
            console.log(allUsers);
            setUsers(allUsers);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
      };

        useEffect(() => {
          getUsers(); 
      }, [user.jwt]);

      const  handleChangingStatus = async (e) => {
        // e.preventDefault();
        try {
          const userStatus = { isActive: false };
          console.log("id of the use" + selectedUserForDelete.id);
          await ajax(`${host}${endpoints.updateUserStatus}/${selectedUserForDelete.id}`, 'PATCH', user.jwt, userStatus);
          alert('Деактивацията е успешна');
          setUsers(users.map(u => u.id === selectedUserForDelete.id ? { ...u, isActive: false } : u));
          handleHideDeleteModal();
        } catch (error) {
          console.error('Error deactivating user:', error);
          alert('Възникна грешка, моля опитайте отново');
        }
      };

      // Modals
      
      const handleShowDeleteModal = (user) => {
        setSelectedUserForDelete(user);
        setIsDeleteModalOpen(true);
      };
  
      const handleHideDeleteModal = () => {
        setSelectedUserForDelete(null);
        setIsDeleteModalOpen(false);
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

      // TODO
    
      const handleSaveUser = (editedUser) => {
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
          console.log('User saved', editedUser);
          setFieldErrors({});
          handleHideEditModal();
        }
      };

          // Function to get the role display name
    const getRoleDisplayName = (roles) => {
      if (roles.includes('SUPERADMIN')) {
          return 'Модератор';
      } else if (roles.includes('ADMIN') && !roles.includes('SUPERADMIN')) {
        return 'Aдминистратор';
      } else return 'Потребител'
      return roles.join(', ');
    };

  return (
    <div>
      {users.length === 0 ? (
                    <p>Няма налични потребители.</p>
                ) : (
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Име</th>
                                <th scope="col">Фамилия</th>
                                <th scope="col">Имейл</th>
                                <th scope="col">Телефон</th>
                                <th scope="col">Роля</th>
                                <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{getRoleDisplayName(user.roles)}</td>
                                    <td className={styles.button_wrapper}>
                                        <button 
                                            className={`btn btn-warning mb-1 ml-2 ${styles.button_customize}`}
                                            onClick={() => handleShowDeleteModal(user)}
                                        >
                                            Деактивирай
                                        </button>
                                        <button 
                                            type='button' 
                                            className={`btn btn-primary mb-1 ${styles.button_customize}`}
                                            onClick={() => handleShowEditModal(user)}
                                        >
                                            Редактирай
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={handleHideDeleteModal}
          onDelete={handleChangingStatus}
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