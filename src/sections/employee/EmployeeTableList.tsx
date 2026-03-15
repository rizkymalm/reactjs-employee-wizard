import React, { useEffect, useState } from 'react';

// import { getBasicInfo } from '../../services/basicInfo.service';
import {
    listBasicInfo,
    listBasicInfoPagination,
} from '../../actions/basicInfo';
import { detailInfo, listDetailInfoPagination } from '../../actions/detail';
import Pagination from '../../components/Pagination';
import { useRole } from '../../hooks/useRole';

interface PropsEmployee {
    id: string;
    employeeId?: string;
    fullName?: string;
    email?: string;
    department?: string;
    role?: string;
    location: string;
    photo: string;
    type: string;
}

const EmployeeTableList = () => {
    const { role } = useRole();
    const [list, setList] = useState<PropsEmployee[]>([]);
    const [total, setTotal] = useState({
        page: 0,
        field: 0,
    });
    const [params, setParams] = useState({
        search: '',
        page: 1,
        perPage: 10,
    });
    useEffect(() => {
        async function basicInfoList() {
            const arrList: PropsEmployee[] = [];
            if (role === 'admin') {
                await listBasicInfoPagination({
                    _page: params.page,
                    _limit: params.perPage,
                    callback: async (data: any) => {
                        const lists = data.response;
                        const promise = lists.map(async (item: any) => {
                            await detailInfo({
                                key: 'employeeId',
                                value: item.employeeId,
                                callback: (detail: any) => {
                                    arrList.push({
                                        id: item.id,
                                        employeeId: item.employeeId,
                                        fullName: item.fullName,
                                        email: item.email,
                                        department: item.department,
                                        role: item.role,
                                        location: detail.response[0].location,
                                        photo: detail.response[0].photo,
                                        type: detail.response[0].type,
                                    });
                                },
                            });
                        });
                        await Promise.all(promise);
                        setList(arrList);
                    },
                });
                await listBasicInfo({
                    callback: (data: any) => {
                        setTotal({
                            field: data.response.length,
                            page: data.response.length / params.perPage,
                        });
                    },
                });
            } else {
                await listDetailInfoPagination({
                    _page: params.page,
                    _limit: params.perPage,
                    callback: (data: any) => {
                        setList(data.response);
                    },
                });
            }
        }
        basicInfoList();
    }, [params]);
    return (
        <div
            className="wrapper"
            style={{
                margin: '4px',
            }}
        >
            <div className="table-container">
                <table className="table-wrapper">
                    <thead>
                        <tr>
                            <th align="left">Name</th>
                            <th align="left">Department</th>
                            <th>Role</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((data: PropsEmployee) => (
                            <tr key={data.id} className="transition-all">
                                <td align="left">
                                    {role === 'admin' ? (
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <div>{`${data.employeeId} - ${data.fullName}`}</div>
                                            <div>{data.email}</div>
                                        </div>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td align="left">
                                    {role === 'admin' ? data.department : 'N/A'}
                                </td>
                                <td>{role === 'admin' ? data.role : 'N/A'}</td>
                                <td>{data.type}</td>
                                <td>{data.location}</td>
                                <td aria-label="employee photo">
                                    <div
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            backgroundImage: `url('${data.photo}')`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    params={params}
                    setParams={setParams}
                    totalPage={total.page}
                    total={total.field}
                    loading={false}
                />
            </div>
        </div>
    );
};

export default EmployeeTableList;
