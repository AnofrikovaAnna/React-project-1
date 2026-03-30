import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { initialState } from './initState';
import { competitionStoreInterface } from '../CompetitionStore/initState';

export const slice = createSlice({
    name: 'allCompetitionStore',
    initialState,
    reducers: {
        addCompetition: (state, action: PayloadAction<competitionStoreInterface>) => {
            state.competitions.push(action.payload);
        },
        deleteCompetition: (state, action: PayloadAction<competitionStoreInterface>) => {
            state.competitions = state.competitions.filter(
                comp => comp.id !== action.payload.id
            );
        },
        clearCompetition: (state) => {
            state.competitions = [];
        },
    },
});

export const allCompetitionSelector = (state: AppState) => state.allCompetitionStore.competitions;