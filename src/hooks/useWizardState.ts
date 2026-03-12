import { useState } from 'react';
import { BasicInfo } from '../lib/types';

export function useWizardState() {
    const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);

    return {
        basicInfo,
        setBasicInfo,
    };
}
