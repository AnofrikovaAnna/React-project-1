import React, { useEffect, useState } from 'react';
import { Nav } from './NavProfile';
import { Box, Typography, List, ListItem, Button, TextField, Stack } from '@mui/material';
import { userIdSelector, userSelector } from '../reducer/UserStore/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../ui/Colors';
import { AppDispatch } from '../store';
import { deleteUser, updateUser } from '../utils/userThunks';

interface ProfileFormData {
    name: string,
    surname: string,
    login: string,
    age: number,
    country: string,
    city: string,
    studyPlace: string,
    password: string,
}

export const ProfilePage = () => {
    const user = useSelector(userSelector);
    const userId = useSelector(userIdSelector);
    const dispatch = useDispatch<AppDispatch>();

    const [isEditing, setIsEditing] = useState(false);
    const [inputData, setInputData] = useState<ProfileFormData>({
        ...user, password: '',
    });

    const handleReduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(true);
        setInputData({...user, password: '',});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(prev => ({...prev, 
            [name] : (name === 'age' ? Number(value) : value)
        }));
    };

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(false);
        try{
            await dispatch(updateUser({...inputData, ["id"] : userId}));
        } catch (error) {
            console.error(error);
        }
    };

    const handleReject = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(false);
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(false);
        try{
            await dispatch(deleteUser(userId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <Nav></Nav>
            <Typography
                component="h1"
                variant="h4"
                sx={{ color: colors.primary.main,
                      margin: '20px',
                }}
            >
                Данные пользователя
            </Typography>
            { isEditing ? 
                (<>
                    <Box 
                        component='form'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'center',
                            padding: '30px', 
                            border: '2px solid' + colors.primary.main,
                            borderRadius: '20px',
                            margin: '80px 100px 40px',
                        }}>
                        <Stack spacing={1} sx={{ width: '100%' }}>
                            <TextField 
                                type='text' 
                                placeholder='Логин'
                                value = {inputData.login}
                                name='login'
                                variant='outlined'
                                required
                                onChange={handleChange}
                            />
                            <TextField 
                                type='text' 
                                placeholder='Имя'
                                value = {inputData.name}
                                name='name'
                                variant='outlined'
                                onChange={handleChange}
                            />
                            <TextField 
                                type='text' 
                                placeholder='Фамилия'
                                value = {inputData.surname}
                                name='surname'
                                variant='outlined'
                                onChange={handleChange}
                            />
                            <TextField 
                                type='text' 
                                placeholder='Возраст'
                                value = {inputData.age.toString()}
                                name='age' 
                                variant='outlined'
                                inputProps={{
                                    pattern: "\\d+",
                                    title: "Только цифры"
                                }}
                                onChange={handleChange}
                            />
                            <TextField 
                                type='text' 
                                placeholder='Страна'
                                value = {inputData.country}
                                name='country' 
                                variant='outlined'
                                onChange={handleChange}
                            />
                            <TextField 
                                type='text' 
                                placeholder='Город'
                                value = {inputData.city}
                                name='city'
                                variant='outlined'
                                onChange={handleChange}

                            />
                            <TextField 
                                type='text' 
                                placeholder='Место учебы'
                                value = {inputData.studyPlace}
                                name='studyPlace'
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
                            <Box sx={{
                                display: 'flex', 
                                gap: '100px',
                                justifyContent: 'center',
                                padding: '20px 0 0',
                            }}>
                                <Button 
                                    variant='contained'
                                    type='submit' 
                                    onClick={handleSave}
                                    sx={{
                                        background: colors.primary.main,
                                    }}>
                                    Сохранить изменения
                                </Button>
                                <Button 
                                    variant='contained'
                                    type='submit' 
                                    onClick={handleReject}
                                    sx={{
                                        background: colors.primary.main,
                                    }}>
                                    Отменить изменения
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                    <Button 
                        variant='contained'
                        type='submit'
                        onClick={handleDelete} 
                        sx={{
                            background: colors.background.default,
                            color: colors.status.danger,
                            margin: '0 0 40px',
                        }}>
                        Удалить профиль
                    </Button>
                </>) :
                (<>
                    <List sx={{padding: '30px', 
                            border: '2px solid' + colors.primary.main,
                            borderRadius: '20px',
                            margin: '80px 100px 40px',}}>
                        <ListItem>
                            <Box sx={{display: 'flex',
                                    gap: '30px',}}>
                                <Typography>Логин:</Typography>
                                <Typography>{user.login}</Typography>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box sx={{display: 'flex',
                                    gap: '30px',}}>
                                <Typography>Имя:</Typography>
                                <Typography>{user.name}</Typography>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box sx={{display: 'flex',
                                    gap: '30px',}}>
                                <Typography>Фамилия:</Typography>
                                <Typography>{user.surname}</Typography>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box sx={{display: 'flex',
                                    gap: '30px',}}>
                                <Typography>Возраст:</Typography>
                                <Typography>{user.age}</Typography>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box sx={{display: 'flex',
                                    gap: '30px',}}>
                                <Typography>Страна:</Typography>
                                <Typography>{user.country}</Typography>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box sx={{display: 'flex',
                                    gap: '30px',}}>
                                <Typography>Город:</Typography>
                                <Typography>{user.city}</Typography>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Box sx={{display: 'flex',
                                    gap: '30px',}}>
                                <Typography>Место учебы:</Typography>
                                <Typography>{user.studyPlace}</Typography>
                            </Box>
                        </ListItem>
                    </List>
                    <Button 
                        variant='contained'
                        type='submit' 
                        onClick={handleReduct}
                        sx={{
                            background: colors.primary.main,
                        }}>
                        Редактировать профиль
                    </Button>
                </>)
            }
        </Box>
    );
};