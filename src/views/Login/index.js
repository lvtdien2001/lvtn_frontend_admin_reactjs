import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../../components';

const Login = () => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);

    useEffect(() => { document.title = 'Đăng nhập' }, []);

    let body;
    if (authLoading) {
        body = (
            <div>
                Loading . . . .
            </div>
        )
    } else if (isAuthenticated) {
        return <Navigate to='/' />
    }


    return (
        <>
            {body}
            <LoginForm />
        </>
    )
}

export default Login
