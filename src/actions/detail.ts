import { getDetail } from '../services/detail.service';

interface PropsList {
    _page?: number;
    _limit?: number;
    callback?: (response: any) => void;
}

interface PropsDetail {
    key: string;
    value: string;
    callback?: (response: any) => void;
}

export const detailInfo = async ({ key, value, callback }: PropsDetail) => {
    try {
        const response = await getDetail({
            [`${key}`]: value,
        });
        if (callback) {
            callback({
                message: 'success',
                response,
            });
        }
    } catch (error) {
        if (callback) {
            callback({
                message: 'error',
                data: error,
            });
        }
    }
};

export const listDetailInfoPagination = async ({
    _page,
    _limit,
    callback,
}: PropsList) => {
    try {
        const response = await getDetail({
            _page,
            _limit,
        });
        if (callback) {
            callback({
                message: 'success',
                response,
            });
        }
    } catch (error) {
        if (callback) {
            callback({
                message: 'error',
                data: error,
            });
        }
    }
};

export const listDetailInfo = async ({ callback }: PropsList) => {
    try {
        const response = await getDetail();
        if (callback) {
            callback({
                message: 'success',
                response,
            });
        }
    } catch (error) {
        if (callback) {
            callback({
                message: 'error',
                data: error,
            });
        }
    }
};
