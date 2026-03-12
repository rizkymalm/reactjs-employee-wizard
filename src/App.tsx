import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './routes';

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Router />
            </div>
        </BrowserRouter>
    );
}

export default App;
