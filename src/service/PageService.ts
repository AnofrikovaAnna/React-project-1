import { apiClient } from "../api/axios";

const getPage = async () => {
    const token = localStorage.getItem("token");
    const res = await apiClient.get('/protected', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
}

export const pageService = {
    getPage
};