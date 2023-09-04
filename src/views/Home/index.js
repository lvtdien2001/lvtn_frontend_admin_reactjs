import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { NavBar } from '../../components';

const Home = () => {
    const { authState: { isAuthenticated } } = useContext(AuthContext);
    return (
        <>
            {isAuthenticated ? <NavBar /> : <Navigate to='/login' />}
        </>
    )
}

export default Home
