import React, { createContext, useContext, useState } from 'react';
import { WizardState, BasicInfo, DetailInfo } from '../lib/types';

type WizardContextType = {
    wizardState: WizardState;
    setBasicInfo: (data: BasicInfo) => void;
    setDetails: (data: DetailInfo) => void;
    resetWizard: () => void;
};

const WizardContext = createContext<WizardContextType | null>(null);

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

    return (
        <WizardContext.Provider
            value={{
                wizardState,
                setBasicInfo,
                setDetails,
                resetWizard,
            }}
        >
            {children}
        </WizardContext.Provider>
    );
};

export const useWizardState = () => {
    const context = useContext(WizardContext);

    if (!context) {
        throw new Error('useWizardState must be used inside WizardProvider');
    }

    return context;
};
