import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../contexts';

const NavBar = () => {
    const { logout } = useContext(AuthContext);
    return (
        <div>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

export default NavBar
