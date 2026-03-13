import Pagination from '../../components/Pagination';
import { BasicInfo } from '../../lib/types';
import { getBasicInfo } from '../../services/basicInfo.service';
import React, { useEffect, useState } from 'react';

const EmployeeTableList = () => {
    const [list, setList] = useState([]);
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
            const data = await getBasicInfo({
                _page: params.page,
                _per_page: params.perPage,
            });
            setTotal({
                page: data.pages,
                field: data.items,
            });
            setList(data.data);
        }
        basicInfoList();
    }, [params]);

    return (
        <div className="wrapper">
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
                        {list.map((data: BasicInfo) => (
                            <tr key={data.email} className="transition-all">
                                <td align="left">{data.fullName}</td>
                                <td align="left">{data.email}</td>
                                <td>{data.role}</td>
                                <td>{data.role}</td>
                                <td>{data.role}</td>
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
