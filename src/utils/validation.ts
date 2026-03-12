import * as yup from 'yup';

enum type {
    fullTime = 'Full-time',
    partTime = 'Part-time',
    contract = 'Contract',
    intern = 'Intern',
}

export const basicInfoSchema = yup.object({
    fullName: yup.string().required('Full name is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),

    department: yup.string().required('Department is required'),
    role: yup.string().required('Role is required'),
});

export const detailInfoSchema = yup.object({
    type: yup.string().oneOf(Object.values(type) as string[]),
    location: yup.string().required('Department is required'),
});
