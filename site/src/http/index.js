import axios from "axios";
import {refreshAccessToken} from "./userAPI";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

const refreshInterceptor = error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshAccessToken().then(accessData => {
            const token = accessData['access_token'];
            $authHost.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            //$authHost.defaults.headers['Authorization'] = `Bearer ${token}`;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return $authHost(originalRequest);
        });
    }
    return Promise.reject(error);
};

$authHost.interceptors.response.use(
    response => {
        return response;
    },
    refreshInterceptor
);

export {
    $host,
    $authHost
}