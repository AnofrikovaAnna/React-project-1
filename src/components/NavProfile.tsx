import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar } from '@mui/material';
import { colors } from '../ui/Colors';
import { text } from 'stream/consumers';

export const Nav = () => {
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
                        <NavLink to="/profile" 
                                    style={ ({isActive}) => 
                                        ({ color: colors.text.light, 
                                            borderColor: colors.border,
                                            textDecoration: isActive ? 'none' : 'underline',})}>
                            Профиль
                        </NavLink>
                    </Button>
                    <Button>
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