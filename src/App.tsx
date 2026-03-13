import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './routes';
import { RoleProvider } from './context/RoleContext';

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
