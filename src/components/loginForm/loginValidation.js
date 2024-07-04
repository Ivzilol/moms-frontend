import * as Yup from 'yup';

import { LoginFormKeys } from '../../core/environments/constants';

const loginValidation = Yup.object({
    [LoginFormKeys.Email]: Yup.string().required('Моля въведете имейл'),
    [LoginFormKeys.Password]: Yup.string().required('Моля въведете вашата парола'),
});

export default loginValidation;