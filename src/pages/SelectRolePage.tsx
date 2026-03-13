import Page from '../components/Page';
import React from 'react';
import { Button } from '../components/buttons';
import { useRole } from '../context/RoleContext';
import { Role } from '../lib/types';
import { useNavigate } from 'react-router-dom';

const SelectRolePage = () => {
    const navigate = useNavigate();
    const { setRole } = useRole();
    const selectRole = (role: Role) => {
        setRole(role);
        navigate(`/employee?role=${role}`);
    };
    return (
        <Page title="Select Role">
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '8px',
                }}
            >
                <h2>Select Your Role</h2>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                    }}
                >
                    <Button
                        text="Admin"
                        type="button"
                        variant="contained"
                        size="lg"
                        icon="eos-icons:admin-outlined"
                        onClick={() => selectRole('admin')}
                    />
                    <Button
                        text="Ops"
                        type="button"
                        variant="contained"
                        size="lg"
                        icon="mingcute:user-setting-fill"
                        onClick={() => selectRole('ops')}
                    />
                </div>
            </div>
        </Page>
    );
};

export default SelectRolePage;
