// import axios from 'axios';

// const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export default api;

import { ContentType, tokenName, host } from '../core/environments/constants';

const buildOptions = (data, requestType, token) => {
    const options = {};

    if (requestType === ContentType.ApplicationJSON && data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-Type': ContentType.ApplicationJSON,
        };
    } 

    // const token = localStorage.getItem(tokenName);

    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    return options;
};

const api = async (method, url, data, requestType, token) => {
    const response = await fetch(host + url, {
        ...buildOptions(data, requestType, token),
        method,
    });

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        if (response.status === 403) {
            localStorage.removeItem(tokenName);
        }

        throw result;
    }

    return result;
};

export const get = api.bind(null, 'GET');
export const post = api.bind(null, 'POST');
export const put = api.bind(null, 'PUT');
export const patch = api.bind(null, 'PATCH');
export const remove = api.bind(null, 'DELETE');



