import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ProfileCard.module.css';
import { useUser } from '../../userProvider/UserProvider';
import { host, endpoints } from '../../core/environments/constants';
import ajax from '../../service/FetchService';

const ProfileCard = () => {

  const user = useUser();
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { userProfile, setUserProfile, getUserDetails, jwt, loading } = useUser();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUserData = localStorage.getItem('userData');
      const userData = JSON.parse(storedUserData);
      const id = userData.id
      if (jwt) {
        try {
          const data = await getUserDetails(id);
          setUserProfile(data);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          setUserProfile(null);
        }
      }
    };

    fetchUserProfile();
  }, [jwt, getUserDetails, setUserProfile]);

  if (loading) return <p>Loading...</p>;

  if (!userProfile) return <p>Няма създадени акаунти.</p>;

  const handlePasswordEdit = () => {
    setIsEditingPassword(true);
  };

  const handleClosePasswordEdit = () => {
    setIsEditingPassword(false);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleShowModal = () => {
    if (newPassword !== confirmPassword) {
      alert("Паролите не съвпадат!");
      return;
    } 
    setShowModal(true);
  };

  const handleConfirmChangePassword = async () => {
    try {
      const id = JSON.parse(localStorage.getItem('userData')).id;
        const response = await fetch(host + endpoints.updateUserPassword(id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.jwt}`,
            },
            body: JSON.stringify({
              currentPassword: currentPassword,
              newPassword: newPassword,
              confirmPassword: confirmPassword,
            }),
        });

        if (response.status === 200) {
            
            console.log('Change password successful', response);
            setIsEditingPassword(false);
            setShowModal(false);
            console.log('Password saved:', newPassword);
            alert('Паролата е успешно променена!');
        
        } else {
            console.error('Change Password failed');
            alert('Възникна грешка при промяната на паролата, моля опитайте отново.');
        }
    } catch (error) {
        console.error('Error updating passowrd:', error);
    }
};

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`profile-card ${styles['profile_card']}`}>
      <h5 className="card-title">Лични Данни</h5>

      <div className='mb-2'>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">Име</label>
            <input type="text" className="form-control" id="firstName" value={userProfile.firstName} readOnly />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">Фамилия</label>
            <input type="text" className="form-control" id="lastName" value={userProfile.lastName} readOnly />
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">Имейл</label>
            <input type="email" className="form-control" id="email" value={userProfile.email} readOnly />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="phone" className="form-label">Номер</label>
            <input type="text" className="form-control" id="phone" value={userProfile.phoneNumber} readOnly />
          </div>
        </div>
      </div>

      <div className="mb-3">
        {isEditingPassword ? (
          <>
            <div className={`row ${styles.edit_passwords}`}>
              <div className='col-md-6 mb-3'>
                <label htmlFor="currentPassword" className="form-label">Текуща Парола</label>
                <input
                  type="password"
                  className="form-control mb-2"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor="newPassword" className="form-label">Нова Парола</label>
                <input
                  type="password"
                  className="form-control mb-2"
                  id="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor="confirmPassword" className="form-label">Потвърди Паролата</label>
                <input
                  type="password"
                  className="form-control mb-2"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleShowModal}>Запази</button>
            <button className="btn btn-link" onClick={handleClosePasswordEdit}>Затвори</button>
          </>
        ) : (
          <>
            <button className="btn btn-link" onClick={handlePasswordEdit}>Промени паролата</button>
          </>
        )}
      </div>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Потвърди промяната на паролата</Modal.Title>
        </Modal.Header>
        <Modal.Body>Сигурни ли сте, че искате да промените паролата си?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Откажи
          </Button>
          <Button variant="primary" onClick={handleConfirmChangePassword}>
            Потвърди
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileCard;
