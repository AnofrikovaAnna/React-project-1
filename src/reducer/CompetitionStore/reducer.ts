import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { initialState } from './initState';
import { addCompetition } from '../UserCompetitionStore';

export const slice = createSlice({
    name: 'competitionStore',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setNumOfTasks: (state, action: PayloadAction<number>) => {
            state.numOfTasks = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setIsEnded: (state, action: PayloadAction<boolean>) => {
            state.isEnded = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        setCompetition: (state, action: PayloadAction<{name: string, date: string, duration: number, numOfTasks: number}>) => {
            state.name = action.payload.name;
            state.date = action.payload.date;
            state.duration = action.payload.duration;
            state.numOfTasks = action.payload.numOfTasks;
            addCompetition(state);
        },
        setUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload;
        },
        clearCompetition: (state) => {
            state.name = '';
            state.date = '';
            state.duration = 0;
            state.numOfTasks = 0;
            state.id = -1;
            state.userId = -1;
            state.isEnded = false;
        },
    },
});
export const competitionSelector = (state: AppState) => state.competitionStore;