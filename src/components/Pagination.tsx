'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { SelectOption } from './forms';


interface Props {
    params: {
        page: number;
        perPage: number;
        search: string;
    };
    setParams?: any;
    totalPage: number;
    total: number;
    loading?: boolean;
}

const optionPagination = [
    {
        key: '10',
        text: '10',
        value: '10',
    },
    {
        key: '25',
        text: '25',
        value: '25',
    },
    {
        key: '50',
        text: '50',
        value: '50',
    },
];

const Pagination = ({
    params,
    setParams,
    totalPage,
    total,
    loading,
}: Props) => {
    const [pagination, setPagination] = useState({
        start: 0,
        end: 0,
    });
    useEffect(() => {
        setPagination({
            start: params.page * params.perPage - (params.perPage - 1),
            end:
                params.page === totalPage
                    ? total
                    : params.page * params.perPage,
        });
    }, [params, totalPage, total]);
    const handleSetPage = (page: number) => {
        setParams({
            ...params,
            page: page !== 0 ? page : params.page,
        });
    };
    return (
        <div className="pagination">
            <div className="pagination-row-selection">
                <div>Rows Per Page</div>
                <div className="pagination-row-content">
                    <SelectOption
                        options={optionPagination}
                        name="perPage"
                        fullWidth
                        onChange={(e: any) => {
                            setParams({
                                ...params,
                                perPage: e.target.value,
                            });
                        }}
                    />
                </div>
            </div>
            <div className="pagination-number">
                <button
                    type="button"
                    onClick={() => handleSetPage(1)}
                    disabled={loading || (params.page === 1 && true)}
                    aria-label="first"
                >
                    <span className="hover:bg-light-3 hover:dark:bg-dark-3/50 rounded-full p-2">
                        <Icon
                            icon="fluent:arrow-previous-20-regular"
                            width={20}
                            height={20}
                        />
                    </span>
                </button>
                <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center"
                    onClick={() => handleSetPage(params.page - 1)}
                    disabled={loading || (params.page === 1 && true)}
                    aria-label="prev"
                >
                    <span className="hover:bg-light-3 hover:dark:bg-dark-3/50 rounded-full p-2">
                        <Icon
                            icon="fluent:chevron-left-20-regular"
                            width={20}
                            height={20}
                        />
                    </span>
                </button>
                <div className="flex items-center px-2">
                    {`${pagination.start} - ${pagination.end} of ${total || 0}`}
                </div>
                <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center"
                    onClick={() => handleSetPage(params.page + 1)}
                    disabled={loading || (params.page === totalPage && true)}
                    aria-label="next"
                >
                    <span className="hover:bg-light-3 hover:dark:bg-dark-3/50 rounded-full p-2">
                        <Icon
                            icon="fluent:chevron-right-20-regular"
                            width={20}
                            height={20}
                        />
                    </span>
                </button>
                <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center"
                    onClick={() => handleSetPage(totalPage)}
                    disabled={loading || (params.page === totalPage && true)}
                    aria-label="last"
                >
                    <span className="hover:bg-light-3 hover:dark:bg-dark-3/50 rounded-full p-2">
                        <Icon
                            icon="fluent:arrow-next-20-regular"
                            width={20}
                            height={20}
                        />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
