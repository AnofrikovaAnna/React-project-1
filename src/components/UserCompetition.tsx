import React, { useEffect, useRef } from 'react';
import { Nav } from './NavProfile';
import { Box, Typography, List, ListItem } from '@mui/material' 
import { colors } from '../ui/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { userCompetitionSelector } from '../reducer/UserCompetitionStore/reducer';
import { getUserCompetition } from '../utils/competitionThunks';
import { AppDispatch } from '../store';
import { userIdSelector } from '../reducer/UserStore/reducer';

export const UserCompetitionPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const competitions = useSelector(userCompetitionSelector);
    const userId = useSelector(userIdSelector);
    const hasMounted = useRef(false);
    
    useEffect(() => {
        if (!hasMounted.current) {
            dispatch(getUserCompetition(userId));
            hasMounted.current = true;
        }
    }, []);

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
                Мои соревнования
            </Typography>
            <Box sx={{
                    border: '2px solid' + colors.primary.main,
                    borderRadius: '20px',
                    margin: '80px 100px',
                }}>
                <List sx={{
                        padding: '30px', 
                        gap: '20px',
                    }}>
                    <ListItem>
                        <Box sx={{display: 'flex',
                                flexDirection: 'row',
                                gap: '30px',
                                width:'100%',
                                justifyContent: 'space-between',
                            }}>
                            <Typography sx={{ width: '25%' }}>Название</Typography>
                            <Typography sx={{ width: '25%' }}>Дата</Typography>
                            <Typography sx={{ width: '25%' }}>Продолжительность, ч</Typography>
                            <Typography sx={{ width: '25%' }}>Число задач</Typography>
                        </Box>
                    </ListItem>
                    {competitions.map((comp) => (
                        <ListItem key={comp.id}>
                            <Box sx={{display: 'flex',
                                    flexDirection: 'row',
                                    gap: '30px',
                                    width:'100%',
                                    justifyContent: 'space-between',}}>
                                <Typography sx={{ width: '25%' }}>{comp.name}</Typography>
                                <Typography sx={{ width: '25%' }}>{comp.date}</Typography>
                                <Typography sx={{ width: '25%' }}>{comp.duration}</Typography>
                                <Typography sx={{ width: '25%' }}>{comp.numOfTasks}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};