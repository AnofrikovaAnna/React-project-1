import axios from "axios";

const MAIN_URL = 'https://localgost:3000/api';

const loginUser = async (login: string, password: string) => {
    const params = {
        'login': login,
        'password': password,
    };
    const res = await axios.post(`${MAIN_URL}`, {params});
    return res;
};

const registerUser = async (login: string, name: string, surname: string, password: string) => {
    const params = {
        'login': login,
        'name' : name,
        'surname' : surname,
        'password': password,
    };
    const res = await axios.put(`${MAIN_URL}`, {params});
    return res;
};

export const userService = {
    loginUser,
    registerUser,
};