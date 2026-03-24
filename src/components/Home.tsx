import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box,
         Typography} from '@mui/material';
import { colors } from '../ui/Colors';
import { Nav } from './Nav';

export const HomePage = () => {
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
            <Box
                alignSelf='center'
                justifyItems='center'>
                <Typography
                        component="h1"
                        variant="h4"
                        sx={{ fontSize: '60px', 
                              color: colors.primary.main,
                              width: '55%'
                        }}
                    >
                        Сайт медицинского персонала больницы №101
                </Typography>
            </Box>
        </Box>
    );
};