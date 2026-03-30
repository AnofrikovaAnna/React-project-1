import React, { useState, useEffect } from 'react';
import { Button, 
         TextField,
         Box,
         Card,
         Typography,
         Stack } from '@mui/material';
import { colors } from '../ui/Colors';
import { Nav } from './NavLogin';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, loginUser } from '../utils/userThunks';
import { AppDispatch } from '../store';
import { userAuthSelector } from '../reducer/UserStore/reducer';

interface InputFormData {
    login: string, 
    password: string,
}

export const SignInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useSelector(userAuthSelector);
    const [inputData, setInputData] = useState<InputFormData>({
        login: '', password: '',
    });

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(prev => ({...prev, [name] : value}));
    };

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await dispatch(loginUser(inputData.login, inputData.password));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/dashboard');
            dispatch(getUser(inputData.login));
        }
    }, [isAuth, navigate]);

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateRows: 'auto  1fr',
                height: '100vh',
                padding: '20px',
                backgroundColor: colors.background.default,
            }}
            >
            <Nav></Nav>
            <Card 
                variant='outlined'
                sx={{
                    alignSelf: 'center',
                    justifySelf: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '40px',
                }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ fontSize: '30px', alignSelf: 'center', }}
                >
                    Авторизация
                </Typography>
                <Box 
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'center',
                    }}>
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <TextField 
                            type='text' 
                            placeholder='Логин'
                            name='login' 
                            required
                            variant='outlined'
                            onChange={handleChange}
                        />
                        <TextField 
                            type='text' 
                            placeholder='Пароль'
                            name='password' 
                            required
                            variant='outlined'
                            onChange={handleChange}
                        />
                        <Button 
                            variant='contained'
                            type='submit' 
                            sx={{
                                background: colors.primary.main,
                            }}>
                            Войти
                        </Button>
                    </Stack>
                </Box>
            </Card>
        </Box>
        
    );
};