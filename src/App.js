import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import OrderPage from './pages/orderPage/OrderPage';
import NotFoundPage from './pages/404/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <>
          <Header />
          <div className="main-wraper">
            <main className="main-content">
              <Router>
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/orders" component={OrderPage} />
                  <Route component={NotFoundPage} />
                </Routes>
              </Router>
            </main>
          </div>
        </>
      </AuthProvider>
    </ErrorBoundary>

  );
};

export default App;
