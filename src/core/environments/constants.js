export const host = 'http://localhost:8080/v1/';

export const PATH = {
    home: '/',
    login: '/login',
};

export const endpoints = {
    // AUTH
    login: 'user/user/query/login',
    register: 'superadmin/user/command/register',

    // USERS
    getUserProfile: (id) => `user/user/query/user/${id}`,
    getAllUsers: 'superadmin/user/query/getallusers',
    // updateUserProfile: (id) => `user/user/command/profile/${id}`,
    updateUserStatus: (id) => `admin/user/command/profile/${id}`,
    updateUserPassword: (id) => `user/user/command/change-password/${id}`
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