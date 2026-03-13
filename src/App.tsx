import './App.css';

import { BrowserRouter } from 'react-router-dom';

import { RoleProvider } from './context/RoleProvider';
import Router from './routes';

function App() {
    return (
        <BrowserRouter>
            <RoleProvider>
                <Router />
            </RoleProvider>
        </BrowserRouter>
    );
}

export default App;
