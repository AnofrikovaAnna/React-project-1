import { Action, ThunkAction } from "@reduxjs/toolkit";
import { setIsAuth, setLogin, setName, setSurname } from '../reducer/UserStore';
import { userService } from '../service/UserService';
import { AppState } from '../store';

export function loginUser(login: string, password: string): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        try {
            const data = await userService.loginUser(login, password);
            dispatch(setIsAuth(data.isAuth));
            dispatch(setLogin(login));
        } catch (error) {
            console.error("Error:", error);
        }
        finally {
            console.log("Конец запроса");
        }
    };
}

export function registerUser(login: string, name: string, surname: string, password: string): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        try {
            const data = await userService.registerUser(login, name, surname, password);
            dispatch(setIsAuth(data.isAuth));
            dispatch(setLogin(login));
            dispatch(setName(name));
            dispatch(setSurname(surname));
        } catch (error) {
            console.error("Error:", error);
        } finally {
            console.log("Конец запроса");
        }
    };
}