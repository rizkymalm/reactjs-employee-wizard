import { createContext } from 'react';

import type { WizardState } from '../lib/types';

export type WizardContextType = {
    wizardState: WizardState;
    setBasicInfo: (data: any) => void;
    setDetails: (data: any) => void;
    resetWizard: () => void;
};

export const WizardContext = createContext<WizardContextType | null>(null);
