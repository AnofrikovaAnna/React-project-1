import React, { useEffect, useRef } from 'react';
import { Nav } from './NavProfile';
import { Box, Typography, List, ListItem } from '@mui/material' 
import { colors } from '../ui/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { allCompetitionSelector } from '../reducer/AllCompetitionStore/reducer';
import { getAllCompetition } from '../utils/competitionThunks';
import { AppDispatch } from '../store';

export const CompetitionPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const competitions = useSelector(allCompetitionSelector);
    const hasMounted = useRef(false);
    
    useEffect(() => {
        if (!hasMounted.current) {
            dispatch(getAllCompetition());
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
                Соревнования
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