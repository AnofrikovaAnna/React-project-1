import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { initialState } from './initState';

export const slice = createSlice({
    name: 'errorStore',
    initialState,
    reducers: {
        setIsError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        setErrorNum: (state, action: PayloadAction<number>) => {
            state.errorNum = action.payload;
        },
        setErrorName: (state, action: PayloadAction<string>) => {
            state.errorName = action.payload;
        },
        clearError: (state) => {
            state = initialState;
        }
    },
});

export const errorSelector = (state: AppState) => state.errorStore;
