import { useEffect, useMemo, useState } from 'react';

import type { Role } from '../lib/types';
import { RoleContext } from './RoleContext';

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRoleState] = useState<Role>(null);

    useEffect(() => {
        const savedRole = localStorage.getItem('role') as Role;
        if (savedRole) {
            setRoleState(savedRole);
        }
    }, []);

    const setRole = (roles: Role) => {
        setRoleState(roles);
        localStorage.setItem('role', roles || '');
    };

    const value = useMemo(() => {
        return { role, setRole };
    }, [role]);

    return (
        <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
    );
};
