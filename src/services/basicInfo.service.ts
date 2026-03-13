import Api from '../lib/api';

const dummy = new Api({
    baseUrl: 'http://localhost:4001',
    xApiKey: '',
});

export const createBasicInfo = async (data: any) => {
    const response = await dummy.post('/basicInfo', data);
    return response;
};

export const showBasicInfo = async () => {
    const response = await dummy.get('/basicInfo');
    return response;
};

export const getDepartments = async (queries?: any) => {
    const response = await dummy.get('/departments', {
        queries,
    });
    return response;
};
