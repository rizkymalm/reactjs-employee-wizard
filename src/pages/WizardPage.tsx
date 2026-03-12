import WizardStep2 from '../sections/wizard/WizardStep2';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const WizardPage = () => {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role');
    return (
        <div style={{ width: '100%' }}>
            <WizardStep2 />
        </div>
    );
};

export default WizardPage;
