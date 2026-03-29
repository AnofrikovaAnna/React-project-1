import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { initialState } from './initState';

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
    },
});
export const competitionSelector = (state: AppState) => state.competitionStore;
