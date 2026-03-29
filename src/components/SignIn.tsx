import React, { useState } from 'react';
import { Button, 
         TextField,
         Box,
         Card,
         Typography,
         Stack } from '@mui/material';
import { colors } from '../ui/Colors';
import { Nav } from './NavLogin';
import { useDispatch } from 'react-redux';

interface InputFormData {
    login: string, 
    password: string,
}

export const SignInPage = () => {
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState<InputFormData>({
        login: '', password: '',
    });

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(prev => ({...prev, [name] : value}));
    };

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

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