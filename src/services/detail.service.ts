import Api from '../lib/api';

const dummy = new Api({
    baseUrl: 'http://localhost:4002',
    xApiKey: '',
});

export const postDetail = async (data: any) => {
    const response = await dummy.post('/details', data);
    return response;
};

export const getDetail = async () => {
    const response = await dummy.get('/details');
    return response;
};

export const getLocation = async (queries?: any) => {
    const response = await dummy.get('/locations', {
        queries,
    });
    return response;
};
