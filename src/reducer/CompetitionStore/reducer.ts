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

// export const competitionId = (state: AppState) => state.competitionStore.id;
// export const competitionNumOfTasks = (state: AppState) => state.competitionStore.numOfTasks;
// export const competitionDuration = (state: AppState) => state.competitionStore.duration;
// export const competitionIsEnded = (state: AppState) => state.competitionStore.isEnded;
// export const competitionName = (state: AppState) => state.competitionStore.name;
// export const competitionDate = (state: AppState) => state.competitionStore.date;

export const competitionSelector = (state: AppState) => state.competitionStore;
