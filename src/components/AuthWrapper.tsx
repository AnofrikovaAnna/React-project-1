import React from 'react';
import { useSelector } from 'react-redux';
import { HomePage } from './Home';
import { SignInPage } from './SignIn';
import { SignUpPage } from './SignUp';
import { userAuthSelector } from '../reducer/UserStore/reducer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

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
                        <Route path="*" element={
                            <Box>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                >
                                    Страница не найдена
                                </Typography>
                                <Button> 
                                    <NavLink to="/">
                                        Вернуться на главную
                                    </NavLink>
                                </Button>
                            </Box>
                        } />
                    </Routes>
                </Router>
            }
        </div>
    );
};