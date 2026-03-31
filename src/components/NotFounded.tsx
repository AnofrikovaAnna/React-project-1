import React from 'react';
import { Box,
         Typography,
         Button} from '@mui/material';
import { NavLink } from 'react-router-dom';

export const NotFoundedPage = () => {
    return (
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
    );
};