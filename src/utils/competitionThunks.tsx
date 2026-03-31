import { Action, ThunkAction } from "@reduxjs/toolkit";
import { competitionService } from '../service/CompetitionService';
import { AppState } from '../store';
import { setError, clearLoading, setLoading } from "../reducer/SettingStore";
import { clearCompetition, setCompetition, setDate, setDuration, setId, setName, setNumOfTasks, setUserId } from "../reducer/CompetitionStore";
import { addCompetition as addUserCompetition, clearCompetition as clearUserCompetition } from "../reducer/UserCompetitionStore";
import { addCompetition as addAllCompetition, clearCompetition as clearAllCompetition } from "../reducer/AllCompetitionStore";
import { competitionStoreInterface } from "../reducer/CompetitionStore/initState";

export function makeCompetition (comp: {name: string, date: string, duration: number, numOfTasks: number, userId: number}): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('makeCompetition'));
        try {
            const data = await competitionService.makeCompetition(comp);
            dispatch(clearCompetition());
            dispatch(setCompetition({
                name: comp.name, 
                date: comp.date, 
                duration: comp.duration, 
                numOfTasks: comp.numOfTasks
            }));
            dispatch(setId(data.data.id));
            dispatch(setUserId(comp.userId));
        } catch (error : any) {
            console.log(error.message);
            dispatch(setError({
                name: error.message || 'Ошибка создания соревнования',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}

export function getLastCompetition (usetId: number): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('getCompetition'));
        try {
            const data = await competitionService.getLastCompetition(usetId);
            if (data.data !== null && data.data !== undefined)
                dispatch(setCompetition({
                    name: data.data.name, 
                    date: data.data.date, 
                    duration: data.data.duration, 
                    numOfTasks: data.data.numOfTasks
                }));
                dispatch(setId(data.data.id));
                dispatch(setUserId(data.data.userId));
        } catch (error : any) {
            console.log(error.message);
            dispatch(setError({
                name: error.message || 'Ошибка поиска соревнования',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}

export function getUserCompetition (userId: number): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('getUserCompetition'));
        try {
            const data = await competitionService.getUserCompetition(userId);
            dispatch(clearUserCompetition());
            data.data.forEach((comp: competitionStoreInterface) => dispatch(addUserCompetition(comp)));
        } catch (error : any) {
            console.log(error.message);
            dispatch(setError({
                name: error.message || 'Ошибка поиска соревнований пользователя',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}

export function getAllCompetition(): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('getUserCompetition'));
        try {
            const data = await competitionService.getAllCompetition();
            dispatch(clearAllCompetition());
            data.data.forEach((comp: competitionStoreInterface) => dispatch(addAllCompetition(comp)));
        } catch (error : any) {
            console.log(error.message);
            dispatch(setError({
                name: error.message || 'Ошибка поиска соревнований пользователя',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}

export function  moveCompetition(id: number, date: string): ThunkAction<any, AppState, undefined, Action<string>> {
    return async (dispatch) => {
        dispatch(setLoading('getUserCompetition'));
        try {
            const data = await competitionService.moveCompetition(id, date);
            dispatch(setDate(date));
        } catch (error : any) {
            console.log(error.message);
            dispatch(setError({
                name: error.message || 'Ошибка поиска соревнований пользователя',
                num: error.status || 500,
            }));
        } finally {
            dispatch(clearLoading());
            console.log("Конец запроса");
        }
    };
}