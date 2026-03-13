import { useMemo, useState } from 'react';

import type { BasicInfo, DetailInfo, WizardState } from '../lib/types';
import { WizardContext } from './WizardContext';

export const WizardProvider = ({ children }: { children: React.ReactNode }) => {
    const [wizardState, setWizardState] = useState<WizardState>({
        basicInfo: null,
        details: null,
    });

    const setBasicInfo = (data: BasicInfo) => {
        setWizardState((prev: any) => ({
            ...prev,
            basicInfo: data,
        }));
    };

    const setDetails = (data: DetailInfo) => {
        setWizardState((prev: any) => ({
            ...prev,
            details: data,
        }));
    };

    const resetWizard = () => {
        setWizardState({
            basicInfo: null,
            details: null,
        });
    };

    const value = useMemo(() => {
        return { wizardState, setBasicInfo, setDetails, resetWizard };
    }, [wizardState]);

    return (
        <WizardContext.Provider value={value}>
            {children}
        </WizardContext.Provider>
    );
};
