import React from 'react';
import './NotFoundPage.module.css'; 

const NotFoundPage = () => {
  return (
    <div>
      <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
        <div className="error-message bg-light shadow rounded p-4 p-sm-5">
            <div className="error-text fs-3 text-secondary mb-3">Упс, нещо се обърка</div>
            <p className="fs-5 text-muted">Изглежда, че страницата, която търсите, не съществува.</p>
            <a href="/" className="btn btn-primary">Върнете се на началната страница</a>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
