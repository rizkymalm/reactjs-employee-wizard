import { Role } from '../lib/types';
import { createContext, useContext, useEffect, useState } from 'react';

type RoleContextType = {
    role: Role;
    setRole: (role: Role) => void;
};

const RoleContext = createContext<RoleContextType | null>(null);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRoleState] = useState<Role>(null);

    useEffect(() => {
        const savedRole = localStorage.getItem('role') as Role;
        if (savedRole) setRoleState(savedRole);
    }, []);

    const setRole = (role: Role) => {
        setRoleState(role);
        localStorage.setItem('role', role || '');
    };

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => {
    const context = useContext(RoleContext);

    if (!context) {
        throw new Error('useRole must be used inside RoleProvider');
    }

    return context;
};
