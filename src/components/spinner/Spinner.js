import React from 'react'
import styles from './Spinner.module.css'; 

const Spinner = () => {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.text_center}>
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;