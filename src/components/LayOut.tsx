import React, { useState } from 'react';
import { Nav } from './NavProfile';
import { Box, Typography, List, ListItem, Button, TextField, Stack } from '@mui/material' 
import { colors } from '../ui/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { competitionSelector } from '../reducer/CompetitionStore/reducer';
import { AppDispatch } from '../store';
import { moveCompetition } from '../utils/competitionThunks';

export const LayOutPage = () => {
    const competition = useSelector(competitionSelector);
    const dispatch = useDispatch<AppDispatch>(); 

    const [isEditing, setIsEditing] = useState(false);
    const [inputData, setInputData] = useState<string>('');

    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(true);
        setInputData('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(_ => value);
    };

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(false);
        try{
            await dispatch(moveCompetition(competition.id, inputData));
        } catch (error) {
            console.error(error);
        }
    };

    const handleReject = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(false);
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
                Недавно добавленное соревнование
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
                    <ListItem key={competition.id}>
                    <Box sx={{display: 'flex',
                            flexDirection: 'row',
                            gap: '30px',
                            width:'100%',
                            justifyContent: 'space-between',}}>
                        <Typography sx={{ width: '25%' }}>{competition.name}</Typography>
                        <Typography sx={{ width: '25%' }}>{competition.date}</Typography>
                        <Typography sx={{ width: '25%' }}>{competition.duration}</Typography>
                        <Typography sx={{ width: '25%' }}>{competition.numOfTasks}</Typography>
                    </Box>
                </ListItem>
            </List> 
            { competition.id === -1 ?
                <></> :
                <>
                    {   isEditing ? 
                        <>
                            <Box sx = {{ margin: '80px 100px 40px',}}>
                                <Stack spacing={1} sx={{ width: '100%',}}>
                                    <TextField 
                                        type='text' 
                                        placeholder='Дата: ДД.MM.ГГ ЧЧ:MM'

                                        value = {inputData}
                                        name='login'
                                        variant='outlined'
                                        required
                                        onChange={handleChange}
                                        inputProps={{
                                            pattern: '^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.\\d{2}\\s([01][0-9]|2[0-3]):([0-5][0-9])$',
                                            title: "Формат: ДД.ММ.ГГ ЧЧ:ММ (пример: 25.12.24 14:30)"
                                        }}
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
                        </>
                        :
                        <>
                            <Button 
                                variant='contained'
                                type='submit' 
                                onClick={handleMove}
                                sx={{
                                    background: colors.primary.main,
                                    margin: '20px 0 40px', 
                                }}>
                                Перенести соревнование
                            </Button>
                        </>
                    }
                </>
            }
            </Box>
        </Box>
    );
};