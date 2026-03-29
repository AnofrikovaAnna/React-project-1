import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { initialState } from './initState';

export const slice = createSlice({
    name: 'userStore',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.user.name = action.payload;
        },
        setSurname: (state, action: PayloadAction<string>) => {
            state.user.surname = action.payload;
        },
        setLogin: (state, action: PayloadAction<string>) => {
            state.user.login = action.payload;
        },
        setAge: (state, action: PayloadAction<number>) => {
            state.user.age = action.payload;
        },
        setCountry: (state, action: PayloadAction<string>) => {
            state.user.country = action.payload;
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.user.city = action.payload;
        },
        setStudyPlace: (state, action: PayloadAction<string>) => {
            state.user.studyPlace = action.payload;
        },
    },
});

export const userAuthSelector = (state: AppState) => state.userStore.isAuth;
export const userSelector = (state: AppState) => state.userStore.user;