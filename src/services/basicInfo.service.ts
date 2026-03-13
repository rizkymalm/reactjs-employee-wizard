import { apiFetch } from '../lib/api';

const baseUrl = 'http://localhost:4001';

export async function createBasicInfo(data: any) {
    const response = await apiFetch({
        baseUrl: baseUrl,
        endpoint: '/basicInfo',
        method: 'POST',
        data,
    });
    return response;
}

export async function getDepartments(params?: any) {
    const response = await apiFetch({
        baseUrl: baseUrl,
        endpoint: '/departments',
        method: 'GET',
        params,
    });
    return response;
}

export async function getBasicInfo(params?: any) {
    const response = await apiFetch({
        baseUrl: baseUrl,
        endpoint: '/basicInfo',
        method: 'GET',
        params,
    });
    return response;
}

// export const createBasicInfo = async (data: any) => {
//     const response = await dummy.post('/basicInfo', data);
//     return response;
// };

// export const getBasicInfo = async (queries?: any) => {
//     const response = await dummy.get('/basicInfo', { queries });
//     return response;
// };

// export const getDepartments = async (queries?: any) => {
//     const response = await dummy.get('/departments', {
//         queries,
//     });
//     return response;
// };
