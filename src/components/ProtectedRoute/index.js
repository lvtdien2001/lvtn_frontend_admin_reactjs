import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { LoadingAnimation } from '..';

const ProtectedRoute = ({ children }) => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);
    if (authLoading) {
        return <LoadingAnimation />
    }
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
