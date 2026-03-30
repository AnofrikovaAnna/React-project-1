import { apiClient } from "../api/axios";

const loginUser = async (login: string, password: string) => {
    const params = {
        'login': login,
        'password': password,
    };
    const res = await apiClient.post('/signin', params);
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
    return res.data;
    
};

const logoutUser = async (login: string) => {
    const params = {
        'login': login,
    };
    const res = await apiClient.post('/signout', params);
    return res.data;
};

const getUser = async (login: string) => {
    const res = await apiClient.get(`/profile/${login}`);
    return res.data;
};

const updateUser = async (user: {
        id: number,
        name: string,
        surname: string,
        login: string,
        age: number,
        country: string,
        city: string,
        studyPlace: string,
        password: string,
    }) => {
    const res = await apiClient.put(`/profile/${user.login}/update`, user);
    return res.data;
};

const deleteUser = async (userId : number) => {
    const res = await apiClient.delete(`/profile/${userId}/update`);
    return res.data;
}

export const userService = {
    loginUser,
    registerUser,
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
};