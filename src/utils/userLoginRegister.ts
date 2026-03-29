import { Action, ThunkAction } from "@reduxjs/toolkit";
import { setIsAuth, setLogin } from '../reducer/UserStore';
import { userService } from '../service/UserService';
import { AppState } from '../store';
import { userSelector } from "../reducer/UserStore/reducer";
import { UseSelector } from "react-redux";

export function loginUser(login: string, password: string): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        try {
            const data = await userService.loginUser(login, password);
            dispatch(setIsAuth(true));
            dispatch(setLogin(login))
        } catch (error) {
            console.log("Error:", error);
        }
    };
}

export function registerUser(login: string, password: string): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        try {
            const data = await userService.loginUser(login, password);
            dispatch(setIsAuth(true));
            dispatch(setLogin(login))
        } catch (error) {
            console.log("Error:", error);
        }
    };
}