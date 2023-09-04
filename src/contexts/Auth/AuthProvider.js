import { useEffect, useReducer } from 'react';
import AuthContext from './AuthContext';
import authReducer from '../../reducers/authReducer';
import { LOCAL_STORAGE_TOKEN_NAME } from '../contants';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [authState, dispath] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    // Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const rsp = await axios.get(`${process.env.REACT_APP_API_URL}/auth`);
            if (rsp.data.success) {
                dispath({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: rsp.data.user }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispath({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }

    useEffect(() => { loadUser() }, []);

    // Login
    const login = async (email, password) => {
        try {
            const rsp = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login-admin`, { email, password });
            if (rsp.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, rsp.data.accessToken);
            }
            await loadUser();
            return rsp.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return {
                    success: false,
                    msg: error.message
                }
            }
        }
    }

    // Logout
    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispath({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null }
        })
    }

    const authContextData = { login, logout, authState };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
