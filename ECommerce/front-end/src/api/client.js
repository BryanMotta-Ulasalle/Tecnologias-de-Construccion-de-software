import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(config => {
    if (!config.withAuth) {
        delete config.headers.Authorization;
        return config;
    }

    const token = localStorage.getItem('access');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
})
/*
apiClient.interceptors.response.use(response => response,
error => {
    if(error.response && error.response.status === 401){
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
}) */

export default apiClient;
