import { Action, ThunkAction } from "@reduxjs/toolkit";
import { pageService } from "../service/PageService";
import { setLoading } from "../reducer/SettingStore";
import { AppState } from "../store";
import { setError } from "../reducer/SettingStore";
import { userService } from "../service/UserService";
import { setProtectedData } from "../reducer/UserStore";


export function getPage(): ThunkAction<void, AppState, undefined, Action<string>> {
  return async (dispatch) => {
    try {
      const data = await pageService.getPage();
      dispatch(setProtectedData(data.status === 200));
    } catch (error: any) {
      dispatch(setError({
        name: error.message || 'Ошибка загрузки данных',
        num: error.status || 500,
      }));
    }
  };
}