import { createContext } from 'react';

import type { Role } from '../lib/types';

export type RoleContextType = {
    role: Role;
    setRole: (role: Role) => void;
};

export const RoleContext = createContext<RoleContextType | null>(null);
