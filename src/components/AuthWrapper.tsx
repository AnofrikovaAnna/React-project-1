import React from 'react';
import { HomePage } from './Home';
import { Navigate } from 'react-router-dom';

interface AuthWrapperProps {
    children: React.ReactNode;
}

export const AuthWrapper : React.FC<AuthWrapperProps> = ({children}) => {
    const isAuth: boolean = false;
    return (
        <div>
            { isAuth ? children : <Navigate to='/signin'/> }
        </div>
    );
};