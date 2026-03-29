import React from 'react';
import { Nav } from './NavProfile';
import { Box, Typography, List, ListItem } from '@mui/material';
import { userSelector } from '../reducer/UserStore/reducer';
import { useSelector } from 'react-redux';
import { colors } from '../ui/Colors';

export const ProfilePage = () => {
    const user = useSelector(userSelector);
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
            <List sx={{padding: '30px', 
                       border: '2px solid' + colors.primary.main,
                       borderRadius: '20px',
                       margin: '80px 100px',}}>
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
        </Box>
    );
};