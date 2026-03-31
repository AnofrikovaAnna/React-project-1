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
        setUser: (state, action: PayloadAction<{
            id: number,
            name: string,
            surname: string,
            login: string,
            age: number,
            country: string,
            city: string,
            studyPlace: string}>) => {
            if (state.user.login !== action.payload.login)
                state.user.login = action.payload.login;
            state.user.name = action.payload.name;
            state.user.surname = action.payload.surname;
            state.user.age = action.payload.age;
            state.user.country = action.payload.country;
            state.user.city = action.payload.city;
            state.user.studyPlace = action.payload.studyPlace;
        },
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setProtectedData: (state, action: PayloadAction<boolean>) => {
            state.protectedData = action.payload;
        },
    },
});

export const userAuthSelector = (state: AppState) => state.userStore.isAuth;
export const userIdSelector = (state: AppState) => state.userStore.id;
export const userSelector = (state: AppState) => state.userStore.user;