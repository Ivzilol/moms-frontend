import * as Yup from 'yup';

const loginValidation = Yup.object({
    email: Yup.string().email('Invalid email address').required('Моля въведете имейл'),
    password: Yup.string().required('Моля въведете вашата парола'),
});

export default loginValidation;