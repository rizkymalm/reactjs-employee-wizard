import React, { useEffect, useState } from 'react';

// import { getBasicInfo } from '../../services/basicInfo.service';
import { listBasicInfo } from '../../actions/basicInfo';
import { detailInfo } from '../../actions/detail';
import Pagination from '../../components/Pagination';

interface PropsEmployee {
    employeeId: string;
    fullName: string;
    email: string;
    department: string;
    role: string;
    location: string;
    photo: string;
}

const EmployeeTableList = () => {
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
            await listBasicInfo({
                _page: params.page,
                _per_page: params.perPage,
                callback: async (data: any) => {
                    setTotal({
                        page: data.response.pages,
                        field: data.response.items,
                    });
                    const lists = data.response.data;
                    const arrList: PropsEmployee[] = [];
                    const promise = lists.map(async (item: any) => {
                        await detailInfo({
                            key: 'employeeId',
                            value: item.employeeId,
                            callback: (detail: any) => {
                                arrList.push({
                                    employeeId: item.employeeId,
                                    fullName: item.fullName,
                                    email: item.email,
                                    department: item.department,
                                    role: item.role,
                                    location: detail.response[0].location,
                                    photo: detail.response[0].photo,
                                });
                            },
                        });
                    });
                    await Promise.all(promise);
                    setList(arrList);
                },
            });
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
                            <th>Location</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((data: PropsEmployee) => (
                            <tr key={data.email} className="transition-all">
                                <td align="left">
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <div>{`${data.employeeId} - ${data.fullName}`}</div>
                                        <div>{data.email}</div>
                                    </div>
                                </td>
                                <td align="left">{data.department}</td>
                                <td>{data.role}</td>
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
