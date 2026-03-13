import { BasicInfo } from '../../lib/types';
import { getBasicInfo } from '../../services/basicInfo.service';
import React, { useEffect, useState } from 'react';

const EmployeeTableList = () => {
    const [list, setList] = useState<BasicInfo[]>([]);
    useEffect(() => {
        async function basicInfoList() {
            const data = await getBasicInfo();
            setList(data);
        }
        basicInfoList();
    }, []);

    return (
        <div className="wrapper">
            <table className="table-wrapper">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Location</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((data: BasicInfo) => (
                        <tr key={data.email} className="transition-all">
                            <td>{data.fullName}</td>
                            <td>{data.email}</td>
                            <td>{data.role}</td>
                            <td>{data.role}</td>
                            <td>{data.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTableList;
