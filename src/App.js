import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Product, Warehouse, Order, OrderDetail } from './views';
import { ProtectedRoute } from './components';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/product' element={<ProtectedRoute><Product /></ProtectedRoute>} />
                <Route path='/warehouse' element={<ProtectedRoute><Warehouse /></ProtectedRoute>} />
                <Route path='/order' element={<ProtectedRoute><Order /></ProtectedRoute>} />
                <Route path='/order/:id' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
