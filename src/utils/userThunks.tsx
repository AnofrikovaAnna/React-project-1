import { Action, ThunkAction } from "@reduxjs/toolkit";
import { setIsAuth, setLogin, setName, setSurname } from '../reducer/UserStore';
import { userService } from '../service/UserService';
import { AppState } from '../store';
import { setError, clearLoading, setLoading } from "../reducer/SettingStore";

export function loginUser(login: string, password: string): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('loginUser'));
        try {
            const data = await userService.loginUser(login, password);
            if (data.status !== 200){
                throw new Error(data.statusText);
            }
            dispatch(setIsAuth(data.isAuth));
            dispatch(setLogin(login));
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
            if (data.status !== 200){
                throw new Error(data.statusText);
            }
            dispatch(setIsAuth(data.isAuth));
            dispatch(setLogin(login));
            dispatch(setName(name));
            dispatch(setSurname(surname));
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