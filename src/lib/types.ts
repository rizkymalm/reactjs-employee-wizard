export type Role = 'admin' | 'ops' | null;

export type BasicInfo = {
    employeeId?: string;
    fullName: string;
    email: string;
    department: string;
    role: string;
};

export type DetailInfo = {
    employeeId?: string;
    photo: any;
    type: string;
    location: string;
    notes?: string;
};

export type WizardState = {
    basicInfo: BasicInfo | null;
    details: DetailInfo | null;
};
