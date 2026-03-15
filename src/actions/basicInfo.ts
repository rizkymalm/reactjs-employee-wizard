import { getBasicInfo } from '../services/basicInfo.service';

interface PropsList {
    _page?: number;
    _per_page?: number;
    callback?: (response: any) => void;
}

interface PropsDetail {
    key: string;
    value: string;
    callback?: (response: any) => void;
}

export const detailBasicInfo = async ({
    key,
    value,
    callback,
}: PropsDetail) => {
    try {
        const response = await getBasicInfo({
            [`${key}:eq`]: value,
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

export const listBasicInfo = async ({
    _page,
    _per_page,
    callback,
}: PropsList) => {
    try {
        const response = await getBasicInfo({
            _page,
            _per_page,
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
