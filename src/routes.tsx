import { Navigate, useRoutes, useSearchParams } from 'react-router-dom';

import EmployeePage from './pages/EmployeePage';
import SelectRolePage from './pages/SelectRolePage';
import WizardPage from './pages/WizardPage';
import WizardStep1 from './sections/wizard/WizardStep1';
import WizardStep2 from './sections/wizard/WizardStep2';

export default function Router() {
    const [params] = useSearchParams();
    const role = params.get('role');
    return useRoutes([
        {
            path: '/',
            children: [
                {
                    path: '',
                    element: <SelectRolePage />,
                },
                {
                    path: 'wizard',
                    element: <WizardPage />,
                    children: [
                        {
                            path: 'step-1',
                            element:
                                role === 'admin' ? (
                                    <WizardStep1 />
                                ) : (
                                    <Navigate to="/employee" />
                                ),
                        },
                        {
                            path: 'step-2',
                            element: <WizardStep2 />,
                        },
                    ],
                },
                {
                    path: 'employee',
                    element: <EmployeePage />,
                },
                { path: '404', element: 'not found' },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}
