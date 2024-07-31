// ProfileCard.js
import React, { useState, useEffect } from 'react';
import styles from './ProfileCard.module.css';

import { useUser } from '../../userProvider/UserProvider'

const ProfileCard = () => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [password, setPassword] = useState('');

  const { userProfile, setUserProfile, getUserDetails, jwt, loading  } = useUser();

  useEffect(() => {
    const fetchUserProfile = async () => {

      // TODO get the data from localstorage NB!!!

      const id = 1;
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

if (!userProfile) return <p>No user profile available.</p>;



  const handlePasswordEdit = () => {
    setIsEditingPassword(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const savePassword = () => {
    setIsEditingPassword(false);
    console.log('Password saved:', password);
  };

  return (
    <div className={`profile-card ${styles['profile-card']}`}>
      <h5 className="card-title">Лични Данни</h5>

      <div className='mb-3'>
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
                <input type="tel" className="form-control" id="phone" value={userProfile.phoneNumber} readOnly />
            </div>
        </div>
      </div>
      

      
      
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Парола</label>
        {isEditingPassword ? (
          <>
            <input type="password" className="form-control mb-2" id="password" value={userProfile.password} onChange={handlePasswordChange} />
            <button className="btn btn-primary" onClick={savePassword}>Запази</button>
          </>
        ) : (
          <>
            <input type="password" className="form-control" id="password" value="*********" readOnly />
            <button className="btn btn-link" onClick={handlePasswordEdit}>Промени паролата</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
