import React from 'react';
import { useSelector } from 'react-redux';
import { HomePage } from './Home';
import { SignInPage } from './SignIn';
import { SignUpPage } from './SignUp';
import { userAuthSelector } from '../reducer/UserStore/reducer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { NotFoundedPage } from './NotFounded';
import { ProtectedRoute } from './ProtectedRoute';

interface AuthWrapperProps {
    children: React.ReactNode;
}

export const AuthWrapper : React.FC<AuthWrapperProps> = ({children}) => {
    return <>{children}</>;
};