import EmployeeTableList from '../sections/employee/EmployeeTableList';
import Page from '../components/Page';
import React from 'react';
import { Button } from '../components/buttons';
import { useRole } from '../context/RoleContext';
import { useNavigate } from 'react-router-dom';

const EmployeePage = () => {
    const { role } = useRole();
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate(`/wizard/step-1?role=${role}`);
    };
    return (
        <Page title="Employee Page">
            <div
                style={{
                    width: '100%',
                }}
            >
                <Button
                    text="Create Employee"
                    type="button"
                    variant="contained"
                    size="md"
                    icon="mdi:create"
                    onClick={handleRedirect}
                />
                <EmployeeTableList />
            </div>
        </Page>
    );
};

export default EmployeePage;
