import { NodeBuilderFlags } from "typescript";

interface userStoreInterface {
    id: number;
    isAuth: boolean;
    user: {
        name: string;
        surname: string;
        login: string;
        age: number;
        country: string;
        city: string;
        studyPlace: string;
    }
    protectedData: boolean;
}

export const initialState : userStoreInterface = {
    id: -1,
    isAuth: false,
    user: {
        name: 'имя',
        surname: 'фамилия',
        login: 'логин',
        age: 0,
        country: 'страна',
        city: 'город',
        studyPlace: 'место учебы',
    },
    protectedData: false,
};