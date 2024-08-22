import React, { useState, useEffect } from 'react';
import ajax from '../../service/FetchService';
import {useUser} from "../../userProvider/UserProvider";
import {useNavigate} from "react-router-dom";
import styles from './UserList.module.css';
import { host, endpoints } from '../../core/environments/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import DeleteUserModal from './DeleteUserModal';
import EditUserModal from './EditUserModal';

const UserList = ({ active }) => {

  const user = useUser();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [deleteAction, setDeleteAction] = useState('deactivate');

  const [users, setUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const getUsers = async () => {
    try {
      const allUsers = await ajax(host + endpoints.getAllUsers, 'GET', user.jwt);
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUsers(); 
  }, [user.jwt]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangingStatus = async () => {
    try {
      const updatedStatus = !selectedUserForDelete.isActive;
      setDeleteAction(updatedStatus === false ? 'deactivate' : 'activate')
      const userStatus = { isActive: updatedStatus };
      const id = selectedUserForDelete.id;

      const response = await fetch(
        host + endpoints.updateUserStatus(id), 
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.jwt}`
          },
          body: JSON.stringify(userStatus)
        }
      );

      if (response.status === 200) {  
        setUsers(prevUsers =>
          prevUsers.map(u =>
            u.id === id ? { ...u, isActive: updatedStatus } : u
          )
        );

        await getUsers();

        if (updatedStatus) {
          alert('Активацията е успешна');
        } else {
          alert('Деактивацията е успешна');
        }

        handleHideDeleteModal();
      } else {
        alert('Възникна грешка при актуализирането на потребителския статус.');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Възникна грешка, моля опитайте отново');
    }
  };

  const handleShowDeleteModal = (user, action) => {
    setSelectedUserForDelete(user);
    setDeleteAction(action);
    setIsDeleteModalOpen(true);
  };

  const handleHideDeleteModal = () => {
    setSelectedUserForDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleShowEditModal = (user) => {
    setSelectedUserForEdit(user);
    console.log(selectedUserForEdit);
    setIsEditModalOpen(true);
  };

  const handleHideEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUserForEdit(null);
  };

  const handleEditUser = async (editedUser) => {
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
      return;
    }

    try {
      const id = selectedUserForEdit.id;

      const response = await fetch(host + endpoints.updateUserProfile(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.jwt}`
        },
        body: JSON.stringify({
          email: editedUser.email,
          firstName: editedUser.firstName,
          lastName: editedUser.lastName,
          phoneNumber: editedUser.phoneNumber,
          role: editedUser.role
        }),
      });

      if (response.status !== 200 ) {
        throw new Error('Failed to update user profile');
      }

      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === id ? { ...u, ...editedUser } : u
        )
      );
      await getUsers();
      alert("Редакцията е успешна");
      setFieldErrors({});
      handleHideEditModal();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const getRoleDisplayName = (roles) => {
    if (roles.includes('SUPERADMIN')) {
      return 'Администратор';
    } else if (roles.includes('ADMIN') && !roles.includes('SUPERADMIN')) {
      return 'Модератор';
    } else return 'Потребител';
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const phoneNumber = user.phoneNumber.toLowerCase();
    const role = getRoleDisplayName(user.roles).toLowerCase();

    return (
        (active === undefined || user.isActive === active) &&
        (fullName.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase()) ||
        phoneNumber.includes(searchQuery.toLowerCase()) ||
        role.includes(searchQuery.toLowerCase()))
    );
});

  return (
    <div>
      {isSearchVisible && (
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control"
            placeholder="Търсене по име, имейл, ниво на достъп, телефон..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      )}
      
      {filteredUsers.length === 0 ? (
        <p>{active === true ? 'Няма налични активни потребители.' : active === false ? 'Няма налични неактивни потребители.' : 'Няма налични потребители.'}</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" onClick={() => setIsSearchVisible(!isSearchVisible)} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faSearch}/></th>
              <th scope="col">Име</th>
              <th scope="col">Фамилия</th>
              <th scope="col">Имейл</th>
              <th scope="col">Телефон</th>
              <th scope="col">Роля</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
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
                    onClick={() => handleShowDeleteModal(user, user.isActive ? 'deactivate' : 'activate')}
                  >
                    {user.isActive === true ? 'Деактивирай' : 'Активирай'}
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
        action={deleteAction}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleHideEditModal}
        user={selectedUserForEdit}
        onSave={handleEditUser}
        fieldErrors={fieldErrors}
      />

    </div>
  )
}

export default UserList;
