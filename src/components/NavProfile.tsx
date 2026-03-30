import React, {useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar } from '@mui/material';
import { colors } from '../ui/Colors';
import { userAuthSelector, userSelector } from '../reducer/UserStore/reducer';
import { logoutUser } from '../utils/userThunks';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store';


export const Nav = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(userAuthSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch<AppDispatch>();

    const handleExit = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            await dispatch(logoutUser(user.login));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    });
    

    return (
        <Box 
            component='nav'
            sx={{ 
                backgroundColor: colors.primary.light,
                display: 'flex', 
                gap: 2,
                justifyContent: 'end',
                width: '100%',
                fontSize: '18px',
            }}>
            <AppBar position='static'>
                <Toolbar sx={{gap:'10px',}}>
                    <Button> 
                        <NavLink to="/dashboard" 
                                 style={ ({isActive}) => 
                                       ({ color: colors.text.light, 
                                          borderColor: colors.border,
                                          textDecoration: isActive ? 'none' : 'underline',})}>
                            На главную
                        </NavLink>
                    </Button>
                    <Button>
                        <NavLink to="/competitions" 
                                 style={ ({isActive}) => 
                                       ({ color: colors.text.light, 
                                          borderColor: colors.border,
                                          textDecoration: isActive ? 'none' : 'underline',})}>
                            Cоревнования
                        </NavLink>
                    </Button>
                    <Button>
                        <NavLink to="/usercompetitions" 
                                 style={ ({isActive}) => 
                                       ({ color: colors.text.light, 
                                          borderColor: colors.border,
                                          textDecoration: isActive ? 'none' : 'underline',})}>
                            Мои соревнования
                        </NavLink>
                    </Button>
                    <Button>
                        <NavLink to="/newcompetition" 
                                 style={ ({isActive}) => 
                                       ({ color: colors.text.light, 
                                          borderColor: colors.border,
                                          textDecoration: isActive ? 'none' : 'underline',})}>
                            Новое соревнование
                        </NavLink>
                    </Button>
                    <Button>
                        <NavLink to="/profile" 
                                    style={ ({isActive}) => 
                                        ({ color: colors.text.light, 
                                            borderColor: colors.border,
                                            textDecoration: isActive ? 'none' : 'underline',})}>
                            Профиль
                        </NavLink>
                    </Button>
                    <Button onClick={handleExit}>
                        <NavLink to="/" 
                                 style={ ({isActive}) => 
                                       ({ color: colors.text.light, 
                                          borderColor: colors.border,
                                          textDecoration: isActive ? 'none' : 'underline',})}>
                            Выйти
                        </NavLink>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};