import React from 'react';
import { Box,
         Typography} from '@mui/material';
import { colors } from '../ui/Colors';
import { Nav } from './NavLogin';
import { competitionSelector } from '../reducer/CompetitionStore/reducer';
import { useSelector } from 'react-redux';

export const HomePage = () => {
    const competition = useSelector(competitionSelector);
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
                justifySelf='center'>
                <Typography
                        component="h1"
                        variant="h4"
                        sx={{ fontSize: '60px', 
                              color: colors.primary.main,
                              width: '100%',
                        }}
                    >
                        Соревнования по программированию
                </Typography>

            </Box>
        </Box>
    );
};