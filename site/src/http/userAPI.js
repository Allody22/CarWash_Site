import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Версия с вроде как правильным рефреш токеном
export const login = async (username, password) => {
    const {data} = await $host.post('api/auth/admin/signin', {username, password})
    const {token, refreshToken} = data
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
    return jwt_decode(token)
}

//Функция для рефреша токена
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const {data} = await $host.post('api/auth/refreshtoken', {refreshToken})
    localStorage.setItem('token', data.token)
    localStorage.setItem('refreshToken', data.refreshToken)
    return jwt_decode(data.token)
}

export const signOut = async () => {
    await $authHost.post('api/auth/signout');
    localStorage.clear();
}

export const check = async () => {
    await $authHost.get('api/admin/users/adminRoleCheck');
}

export const updateUserInfo = async (username, fullName, roles, adminNote, userNote, email) => {
    const requestBody = {
        fullName: fullName,
        username: username,
        roles: roles,
        adminNote: adminNote,
        userNote: userNote,
        email: email
    };
    const response =  await $authHost.post('api/admin/users/updateUserInfo',requestBody);
    return await response.data;
};

export const getAllUsers = async () => {
    const response = await $authHost.get('api/admin/users/getAllUserNames');
    return await response.data;
};

export const findUserByPhone = async (userName) => {
    const response = await $authHost.get('api/admin/users/findUserByTelephone?username=' +  encodeURIComponent(userName));
    return await response.data;
};