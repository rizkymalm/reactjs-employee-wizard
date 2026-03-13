import { WizardProvider } from '../context/WizardContext';
import React from 'react';
import { Outlet } from 'react-router-dom';

const WizardPage = () => {
    return (
        <WizardProvider>
            <Outlet />
        </WizardProvider>
    );
};

export default WizardPage;
