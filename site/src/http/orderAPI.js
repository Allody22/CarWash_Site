import {$authHost, $host} from "./index";


// export const getActualOrders = async (orderName) => {
//     const encodedOrderName = encodeURIComponent(orderName);
//     const url = `api/orders/getActualOrders?orderName=${encodedOrderName}`;
//     console.log(url)
//     return await $host.get(url);
// }

export const getActualWashingOrders = async (orderName) => {
    const response = await $host.get('/api/orders/getActualWashingOrders?orderName=' + encodeURIComponent(orderName));
    return await response.data;
};

export const getActualPolishingOrders = async () => {
    const response = await $host.get('/api/orders/getActualPolishingOrders');
    return await response.data;
};

export const getActualTireOrders = async () => {
    const response = await $host.get('/api/orders/getActualTireOrders');
    return await response.data;
};

export const getTableOrders = async (startTime, endTime) => {
    const {data: {orders}} = await $host.post('api/orders/getBookedTimeInOneDay', {startTime, endTime});
    return orders;
};

export const createTireOrder = async (orders, userContacts, wheelR, startTime,
                                      endTime, administrator, specialist, boxNumber,
                                      bonuses, comments, autoNumber, autoType, price) => {
    const requestBody = {
        orders: orders,
        userContacts: userContacts,
        wheelR: wheelR,
        startTime: startTime,
        endTime: endTime,
        administrator: administrator,
        specialist: specialist,
        boxNumber: boxNumber,
        bonuses: bonuses,
        comments: comments,
        autoNumber: autoNumber,
        autoType: autoType,
        price: price
    };
    const response = await $authHost.post('api/orders/createTireOrder', requestBody);
    return response.data;
};

export const createWashingOrder = async (orders, userContacts, startTime,
                                      endTime, administrator, specialist, boxNumber,
                                      bonuses, comments, autoNumber, autoType, price) => {
    const requestBody = {
        orders: orders,
        userContacts: userContacts,
        startTime: startTime,
        endTime: endTime,
        administrator: administrator,
        specialist: specialist,
        boxNumber: boxNumber,
        bonuses: bonuses,
        comments: comments,
        autoNumber: autoNumber,
        autoType: autoType,
        price: price
    };
    const response = await $authHost.post('api/orders/createWashingOrder', requestBody);
    return response.data;
};

export const getPrice = async (orders, bodyType,orderType, wheelR) => {
    const requestBody = {
        orders: orders,
        bodyType: bodyType,
        orderType: orderType,
        wheelR: wheelR
    };
    const response = await $host.post('api/orders/getPriceAndTime', requestBody);
    return response.data;
};


export const getBookedOrdersInTimeInterval = async (startTime, endTime) => {
    const requestBody = {
        startTime: startTime,
        endTime: endTime
    };
    const response = await $host.post('api/orders/getBookedTimeInOneDay', requestBody);
    return response.data;
};
