import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Версия с вроде как правильным рефреш токеном
export const login = async (username, password) => {
    try {
        const { data } = await $host.post('api/auth/admin/signin', { username, password })
        const { token, refreshToken } = data
        //  Сохраняем токены в localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        //  Возвращаем декодированный accessToken
        return jwt_decode(token)
    } catch (error) {
        //  Обработка ошибок, если они появляются
        console.error(error);
        throw new Error("Не удалось выполнить логин");
    }
}

//Функция для рефреша токена
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const { data } = await $host.post('api/auth/refreshtoken', { refreshToken })
    localStorage.setItem('token', data.token)
    localStorage.setItem('refreshToken', data.refreshToken)
    return jwt_decode(data.token)
}

export const signOut = async () => {
    const accessToken = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    await $host.post('api/auth/signout', null, config); // передаем null вместо refreshToken
    localStorage.clear();
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    localStorage.getItem('token') //достаёт аксес токен
    return jwt_decode(data.token)
}

export const getTableOrders = async (startTime, endTime) => {
    const { data: { orders } } = await $host.post('api/orders/getBookedTimeInOneDay', { startTime, endTime });
    return orders;
};
