import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Product, Warehouse } from './views';
import { ProtectedRoute } from './components';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/product' element={<ProtectedRoute><Product /></ProtectedRoute>} />
                <Route path='/warehouse' element={<ProtectedRoute><Warehouse /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
