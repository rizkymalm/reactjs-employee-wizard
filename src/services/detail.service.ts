import { apiFetch } from '../lib/api';

const baseUrl = import.meta.env.VITE_API_STEP2_URL || '';

export async function postDetail(data: any) {
    const response = await apiFetch({
        baseUrl,
        endpoint: '/details',
        method: 'POST',
        data,
    });
    return response;
}

export async function getDetail(params?: any) {
    const response = await apiFetch({
        baseUrl,
        endpoint: '/details',
        method: 'GET',
        params,
    });
    return response;
}

export async function getLocation(params?: any) {
    const response = await apiFetch({
        baseUrl,
        endpoint: '/locations',
        method: 'GET',
        params,
    });
    return response;
}

// export const postDetail = async (data: any) => {
//     const response = await dummy.post('/details', data);
//     return response;
// };

// export const getDetail = async () => {
//     const response = await dummy.get('/details');
//     return response;
// };

// export const getLocation = async (queries?: any) => {
//     const response = await dummy.get('/locations', {
//         queries,
//     });
//     return response;
// };
