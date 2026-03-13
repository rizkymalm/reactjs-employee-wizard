import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/buttons';
import Page from '../components/Page';
import { useRole } from '../hooks/useRole';
import EmployeeTableList from '../sections/employee/EmployeeTableList';

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
