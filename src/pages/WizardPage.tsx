import React from 'react';
import { Outlet } from 'react-router-dom';

import { WizardProvider } from '../context/WizardProvider';

const WizardPage = () => {
    return (
        <WizardProvider>
            <Outlet />
        </WizardProvider>
    );
};

export default WizardPage;
