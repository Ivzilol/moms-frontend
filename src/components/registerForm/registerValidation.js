import * as Yup from 'yup';

import { RegisterFormKeys } from '../../core/environments/constants';

// const passwordRulse = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^.{6,}$/;

const registerValidation = Yup.object({
    [RegisterFormKeys.FirstName]: Yup.string().required(
        'Името е задължително'
    ),
    [RegisterFormKeys.LastName]: Yup.string().required(
        'Фамилията е задълвителна'
    ),
    [RegisterFormKeys.Email]: Yup.string()
        .required('Имейлът е задължителен')
        .email('Невалиден имейл формат'),
    [RegisterFormKeys.Password]: Yup.string()
        .min(5, 'Паролата трябва да съдържа повече от 5 символа')
        .required('Паролата е задължителна')
        .matches(
            passwordRules,
            // 'Password must have at least 1 upper case letter, 1 lower case letter and 1 number.'
            'Паролата трябва да има минимум 6 символа'
        ),
    [RegisterFormKeys.ConfirmPassword]: Yup.string()
        .required('Потвърдере паролата')
        .oneOf(
            [Yup.ref(RegisterFormKeys.Password), null],
            'Паролите не съвпадат'
        ),
});

export default registerValidation;