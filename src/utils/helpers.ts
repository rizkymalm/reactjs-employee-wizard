import type { Role } from '../lib/types';
import { saveDraft } from './draftStorage';

export async function generateEmployeeId(dept: string, count: number) {
    const prefix = dept.slice(0, 3).toUpperCase();
    const seq = String(count + 1).padStart(3, '0');

    return `${prefix}-${seq}`;
}

export const initValue = (role: Role) => {
    const draftRole = `draft_${role}`;
    saveDraft(draftRole, {
        basicInfo: {
            fullName: '',
            email: '',
            department: '',
            role: '',
        },
        detail: {
            photo: '',
            type: '',
            location: '',
            notes: '',
        },
    });
};
