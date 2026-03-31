import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setError } from '../reducer/SettingStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const hasMounted = useRef(false);
    
    useEffect(() => {
        if (!hasMounted.current && !token) {
            dispatch(setError({
                name: 'Необходима авторизация',
                num: 401
            }));
            hasMounted.current = true;
            navigate('/signin', { replace: true });
        }
    }, [token, dispatch]);
    
    if (!token) {
        return (
            <div></div>
        );
    }
    
    return <>{children}</>;
};