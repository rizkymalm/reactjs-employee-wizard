import { Navigate, useRoutes } from 'react-router-dom';
import WizardPage from './pages/WizardPage';
import EmployeePage from './pages/EmployeePage';

export default function Router() {
    return useRoutes([
        {
            path: '/',
            children: [
                {
                    path: '',
                    element: <WizardPage />,
                },
                {
                    path: 'wizard',
                    element: <WizardPage />,
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
