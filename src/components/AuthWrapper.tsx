import React from 'react';
import { useSelector } from 'react-redux';
import { HomePage } from './Home';
import { SignInPage } from './SignIn';
import { SignUpPage } from './SignUp';
import { userAuthSelector } from '../reducer/UserStore/reducer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

interface AuthWrapperProps {
    children: React.ReactNode;
}

export const AuthWrapper : React.FC<AuthWrapperProps> = ({children}) => {
    const isAuth: boolean = useSelector(userAuthSelector);
    return (
        <div>
            { isAuth ?
                children : 
                <Router>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/signin' element={<SignInPage />} />
                        <Route path='/signup' element={<SignUpPage />} />
                        <Route path="*" element={<Navigate to='/'/>} />
                    </Routes>
                </Router>
            }
        </div>
    );
};