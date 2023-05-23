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
    await $authHost.get('api/admin/adminRoleCheck');
}

export const updateUserInfo = async (email, username, fullName, roles) => {
    return await $authHost.put('api/admin/updateUserInfo', {email, username, fullName, roles});
};