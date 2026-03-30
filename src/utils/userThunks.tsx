import { Action, ThunkAction } from "@reduxjs/toolkit";
import { setId, setIsAuth, setLogin, setName, setSurname, setUser } from '../reducer/UserStore';
import { userService } from '../service/UserService';
import { AppState } from '../store';
import { setError, clearLoading, setLoading } from "../reducer/SettingStore";
import { clearCompetition } from "../reducer/CompetitionStore";

export function loginUser(login: string, password: string): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('loginUser'));
        try {
            const data = await userService.loginUser(login, password);
            dispatch(setIsAuth(true));
            dispatch(setLogin(login));
            dispatch(setId(data.data.id));
        } catch (error : any) {
            dispatch(setError({
                name: error.message || 'Ошибка входа в систему',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}

export function registerUser(login: string, name: string, surname: string, password: string): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('registerUser'));
        try {
            const data = await userService.registerUser(login, name, surname, password);
            dispatch(setIsAuth(true));
            dispatch(setLogin(login));
            dispatch(setName(name));
            dispatch(setSurname(surname));
            dispatch(setId(data.data.id));
        } catch (error : any) {
            console.log(error.message);
            dispatch(setError({
                name: error.message || 'Ошибка регистрации',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}

export function logoutUser(login: string): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('logoutUser'));
        try {
            const data = await userService.logoutUser(login);
            dispatch(setIsAuth(false));
            dispatch(clearCompetition());
        } catch (error : any) {
            dispatch(setError({
                name: error.message || 'Ошибка выхода',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}


export function getUser(login: string): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('getUser'));
        try {
            const data = await userService.getUser(login);
            dispatch(setUser(data.data));
        } catch (error : any) {
            dispatch(setError({
                name: error.message || 'Ошибка получения данных',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}

export function updateUser(user: {
    id: number,
    name: string,
    surname: string,
    login: string,
    age: number,
    country: string,
    city: string,
    studyPlace: string,
    password: string,
    }): ThunkAction<any, AppState, undefined, Action<string>> {

    return async (dispatch) => {
        dispatch(setLoading('updateUser'));
        try {
            const data = await userService.updateUser(user);
            dispatch(setUser(user));
        } catch (error : any) {
            dispatch(setError({
                name: error.message || 'Ошибка обновления данных',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}

export function deleteUser(userId: number): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('logoutUser'));
        try {
            const data = await userService.deleteUser(userId);
            dispatch(setIsAuth(false));
            dispatch(clearCompetition());
        } catch (error : any) {
            dispatch(setError({
                name: error.message || 'Ошибка выхода',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}
