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
    const accessToken = localStorage.getItem('token');
    const config = {
        headers: {Authorization: `Bearer ${accessToken}`}
    };
    await $host.post('api/auth/signout', localStorage.getItem('refreshToken'), config); // передаем null вместо refreshToken
    localStorage.clear();
}

export const check = async () => {
    const accessToken = localStorage.getItem('token');
    console.log(accessToken)
     const config = {
         headers: { Authorization: `Bearer ${accessToken}` }
     };
    await $authHost.get('api/test/all',config)
}

export const getTableOrders = async (startTime, endTime) => {
    const {data: {orders}} = await $host.post('api/orders/getBookedTimeInOneDay', {startTime, endTime});
    return orders;
};

export const updateUserInfo = async (email, username, fullName, roles) => {

    const accessToken = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    return await $host.put('api/admin/updateUserInfo', {email, username, fullName, roles},config);
};


export const getPrice = async (ordersRu, bodyType) => {
    const requestBody = {
        ordersRu: ordersRu,
        bodyType: bodyType,
    };
    return await $host.post('api/orders/getPriceAndTime', requestBody);
};