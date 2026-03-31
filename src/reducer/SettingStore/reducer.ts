import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { initialState } from './initState';

export const slice = createSlice({
    name: 'settingStore',
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
        setError: (state, action: PayloadAction<{
            name: string, num: number
            }>) => {
            state.isError = true;
            state.errorName = action.payload.name;
            state.errorNum = action.payload.num;
            const error = new Error(state.errorName);
            console.error(error);
        },
        setLoading: (state, action: PayloadAction<string>) => {
            state.isLoading = true;
            state.loadingName = action.payload;
        },
        clearLoading: (state) => {
            state.isLoading = false;
            state.loadingName = '';
        },
        clearSetting: (state) => {
            state.isError = false;
            state.errorName = '';
            state.errorNum = NaN;
            state.isLoading = false;
            state.loadingName = '';
        },
    },
});

export const settingSelector = (state: AppState) => state.settingStore;
