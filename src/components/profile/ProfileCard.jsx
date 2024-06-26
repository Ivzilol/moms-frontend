// ProfileCard.js
import React, { useState } from 'react';
import styles from './ProfileCard.module.css';

const ProfileCard = () => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handlePasswordEdit = () => {
    setIsEditingPassword(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const savePassword = () => {
    // Implement your logic to save the password here
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
                <input type="text" className="form-control" id="firstName" value="John" readOnly />
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">Фамилия</label>
                <input type="text" className="form-control" id="lastName" value="Doe" readOnly />
            </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className="row">
            <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">Имейл</label>
                <input type="email" className="form-control" id="email" value="john.doe@example.com" readOnly />
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">Номер</label>
                <input type="tel" className="form-control" id="phone" value="+1234567890" readOnly />
            </div>
        </div>
      </div>
      

      
      
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Парола</label>
        {isEditingPassword ? (
          <>
            <input type="password" className="form-control mb-2" id="password" value={password} onChange={handlePasswordChange} />
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
