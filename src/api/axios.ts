import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    headers: { 
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`[API Request] ${config ? config?.method?.toUpperCase() : 'Some Error'} ${config.url}`, config.data);
        if (config.method === 'get') {
            config.params = {...config.params, _t: Date.now() };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        //const originalRequest = error.config;
        // if (error.response?.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;
        //     try {
        //         const refreshToken = localStorage.getItem('refreshToken');
        //         const { data } = await axios.post('/api/auth/refresh', { refreshToken });
        //         localStorage.setItem('token', data.token);
        //         originalRequest.headers.Authorization = `Bearer ${data.token}`;
        //         return apiClient(originalRequest);
        //     } catch (refreshError) {
        //         localStorage.clear();
        //         window.location.href = '/signin';
        //         return Promise.reject(refreshError);
        //     }
        // }
        if (error.response?.status === 400) {
            console.error('Bad Request');
        }
        if (error.response?.status === 401) {
            if (error.response?.data.statusText === "Необходима авторизация"){
                localStorage.removeItem('token');
                window.location.href = '/signin';
            }
            console.error('Unauthorized');
        }
        if (error.response?.status === 403) {
            console.error('Access denied');
        }
        if (error.response?.status === 404) {
            console.error('Resource not found');
        }
        if (error.response?.status >= 500) {
            console.error('Server error. Please try later');
        }
        if (!error.response) {
            console.error('Network error. Check your connection');
        }
        error.message = error.response?.data.statusText || error.message;
        return Promise.reject(error);
    },
);