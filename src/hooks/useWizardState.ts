import { useContext } from 'react';

import { WizardContext } from '../context/WizardContext';

export const useWizardState = () => {
    const context = useContext(WizardContext);

    if (!context) {
        throw new Error('useWizardState must be used inside WizardProvider');
    }

    return context;
};
