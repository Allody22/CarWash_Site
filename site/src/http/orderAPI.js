import {$authHost, $host} from "./index";


export const getOrderInfo = async (orderId) => {
    const response = await $host.get('/api/orders/getOrderInfo?orderId=' + orderId);
    return await response.data;
};

export const getActualWashingOrders = async (orderName) => {
    const response = await $host.get('/api/orders/getActualWashingOrders?orderName=' + encodeURIComponent(orderName));
    return await response.data;
};

export const getServiceInfo = async (orderName, orderType) => {
    const response = await $host.get('/api/orders/getServiceInfo?orderName='
        + encodeURIComponent(orderName) + '&orderType=' + encodeURIComponent(orderType));
    return await response.data;
};

export const getAllWashingOrders = async () => {
    const response = await $host.get('/api/orders/getAllWashingOrders');
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


export const updateOrderInfo = async (orderId, userPhone, orderType,
                                      price,wheelR,
                                      startTime, administrator, autoNumber,
                                      autoType, specialist, boxNumber, bonuses,
                                      comments, executed, endTime) => {
    const requestBody = {
        orderId: orderId,
        userPhone: userPhone,
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
        price: price,
        executed: executed
    };
    console.log("executed: " + executed)
    const response = await $host.put('api/orders/updateOrderInfo', requestBody);
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

export const updateWashingOrder = async (priceFirstType, priceSecondType, priceThirdType,
                                      timeFirstType, timeSecondType, timeThirdType, orderName) => {
    const requestBody = {
        name: orderName,
        priceFirstType: priceFirstType,
        priceSecondType: priceSecondType,
        priceThirdType: priceThirdType,
        timeFirstType: timeFirstType,
        timeSecondType: timeSecondType,
        timeThirdType: timeThirdType,
    };
    const response = await $authHost.put('/api/admin/updateWashingOrder', requestBody);
    return response.data;
};


export const updatePolishingOrder = async (priceFirstType, priceSecondType, priceThirdType,
                                         timeFirstType, timeSecondType, timeThirdType, orderName) => {
    const requestBody = {
        name: orderName,
        priceFirstType: priceFirstType,
        priceSecondType: priceSecondType,
        priceThirdType: priceThirdType,
        timeFirstType: timeFirstType,
        timeSecondType: timeSecondType,
        timeThirdType: timeThirdType,
    };
    const response = await $authHost.put('/api/admin/updatePolishingOrder', requestBody);
    return response.data;
};


export const updateTireOrder = async (price_r_13, price_r_14, price_r_15, price_r_16, price_r_17,
                                      price_r_18,price_r_19,price_r_20,price_r_21,price_r_22, orderName) => {
    const requestBody = {
        name: orderName,
        price_r_13: price_r_13,
        price_r_14: price_r_14,
        price_r_15: price_r_15,
        price_r_16: price_r_16,
        price_r_17: price_r_17,
        price_r_18: price_r_18,
        price_r_19: price_r_19,
        price_r_20: price_r_20,
        price_r_21: price_r_21,
        price_r_22: price_r_22
    };
    const response = await $authHost.put('/api/admin/updateTireOrder', requestBody);
    return response.data;
};


export const createPolishingOrder = async (orders, userContacts, startTime,
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
    const response = await $authHost.post('api/orders/createPolishingOrder', requestBody);
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

export const getPriceAndFreeTime = async (orders, bodyType,orderType, wheelR, startTime, endTime) => {
    const requestBody = {
        orders: orders,
        bodyType: bodyType,
        orderType: orderType,
        wheelR: wheelR,
        startTime: startTime,
        endTime: endTime
    };
    const response = await $host.post('api/orders/getPriceAndTimeForSite', requestBody);
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
