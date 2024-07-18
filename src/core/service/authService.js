import { endpoints } from '../environments/constants';
import { ContentType } from '../environments/constants';

import * as api from '../../api/api';


export const login = async (email, password) => {
    const result =  await api.post(
        endpoints.login,
        { email, password },
        ContentType.ApplicationJSON
    );

    return result;
};

export const register = async (values) =>
    await api.post(endpoints.register, values, ContentType.ApplicationJSON);