import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import OrderPage from './pages/orderPage/OrderPage';
import NotFoundPage from './pages/404/NotFoundPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/orders" component={OrderPage} />
            <Route component={NotFoundPage} />
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;
