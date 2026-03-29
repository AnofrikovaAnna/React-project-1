import { apiClient } from "../api/axios";

const loginUser = async (login: string, password: string) => {
    const params = {
        'login': login,
        'password': password,
    };
    const res = await apiClient.post('/signin', params);
    console.log(res);
    return res.data;
};

const registerUser = async (login: string, name: string, surname: string, password: string) => {
    const params = {
        'login': login,
        'name' : name,
        'surname' : surname,
        'password': password,
    };
    const res = await apiClient.post('/signup', params);
    console.log(res);
    return res.data;
    
};

export const userService = {
    loginUser,
    registerUser,
};