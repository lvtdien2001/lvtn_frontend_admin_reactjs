import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';

const ProtectedRoute = ({ children }) => {
    const { authState: { isAuthenticated } } = useContext(AuthContext);
    if (!isAuthenticated) {
        return (
            <Navigate to='/login' ></Navigate>
        )
    } else {
        return (
            <>{children}</>
        )
    }
}

export default ProtectedRoute
