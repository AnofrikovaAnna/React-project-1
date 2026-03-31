import React, { useState }from 'react';
import { Nav } from './NavProfile';
import { Box, Typography, Stack, TextField, Button } from '@mui/material' 
import { colors } from '../ui/Colors';
import { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { makeCompetition } from '../utils/competitionThunks';
import { userIdSelector } from '../reducer/UserStore/reducer';
import { Navigate, useNavigate } from 'react-router-dom';


interface CompetitionFormData {
    name: string,
    date: string,
    duration: number,
    numOfTasks: number,
}

export const MakeCompetitionPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector(userIdSelector);
    const navigate = useNavigate();

    const [inputData, setInputData] = useState<CompetitionFormData>({
        name: '', date: '', duration: 0, numOfTasks: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(prev => ({...prev, 
            [name] : (name === 'duration' || name === 'numOfTasks' ? Number(value) : value)
        }));
    };

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await dispatch(makeCompetition({...inputData, userId}));
            navigate('/usercompetitions');
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
                Запланировать соревнование
            </Typography>
            <Box 
                component='form'
                onSubmit={handleSubmit}
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
                        placeholder='Название соревнования'
                        name='name'
                        variant='outlined'
                        onChange={handleChange}
                    />
                    <TextField 
                        type='text' 
                        placeholder='Дата: ДД.MM.ГГ ЧЧ:MM'
                        name='date'
                        variant='outlined'
                        onChange={handleChange}
                        inputProps={{
                            pattern: '^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.\\d{2}\\s([01][0-9]|2[0-3]):([0-5][0-9])$',
                            title: "Формат: ДД.ММ.ГГ ЧЧ:ММ (пример: 25.12.24 14:30)"
                        }}
                    />
                    <TextField 
                        type='text' 
                        placeholder='Продолжительность'
                        name='duration'
                        variant='outlined'
                        inputProps={{
                            pattern: "\\d+",
                            title: "Только цифры"
                        }}
                        onChange={handleChange}
                    />
                    <TextField 
                        type='text' 
                        placeholder='Число задач'
                        name='numOfTasks'
                        variant='outlined'
                        inputProps={{
                            pattern: "\\d+",
                            title: "Только цифры"
                        }}
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
                            sx={{
                                background: colors.primary.main,
                            }}>
                            Создать
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};