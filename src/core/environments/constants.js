export const host = 'http://localhost:8080/v1/';
export const hostRegister = 'http://localhost:8085/v1/'

export const PATH = {
    home: '/',
    login: '/login',
};

export const endpoints = {
    // AUTH
    login: '/user/query/login',
    register: 'user/command/register'
};

export const ContentType = {
    ApplicationJSON: 'application/json',

};

export const LoginFormKeys = {
    Email: 'email',
    Password: 'password',
};

export const RegisterFormKeys = {
    FirstName: 'firstName',
    LastName: 'lastName',
    Email: 'email',
    PhoneNumber: 'phoneNumber',
    Password: 'password',
    ConfirmPassword: 'confirmPassword',
    Role: 'role',
};

export const tokenName = 'accessToken';