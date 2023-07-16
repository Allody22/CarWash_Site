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

export const deleteOrderById = async (orderId) => {
    const response = await $host.delete('/api/orders/deleteOrder?orderId='
        + encodeURIComponent(orderId));
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

export const getTableOrdersInOneDay = async (startTime, endTime) => {
    const {data: {orders}} = await $host.get('/api/orders/getBookedTimeInOneDay?startTime='
        + encodeURIComponent(startTime) + '&endTime=' + encodeURIComponent(endTime));
    return await orders;
};

export const getNotMadeOrders = async () => {
    const {data: {orders}} = await $host.get('api/orders/getNotMadeOrders');
    return orders;
};

export const createNewService = async (serviceType, orderName, priceFirstType, priceSecondType, priceThirdType,
                                       timeFirstType, timeSecondType, timeThirdType,
                                       price_r_13, price_r_14, price_r_15, price_r_16, price_r_17,
                                       price_r_18, price_r_19, price_r_20, price_r_21, price_r_22,
                                       time_r_13, time_r_14, time_r_15, time_r_16, time_r_17,
                                       time_r_18, time_r_19, time_r_20, time_r_21, time_r_22, role, includedIn) => {
    const requestBody = {
        serviceType: serviceType,
        name: orderName,
        priceFirstType: priceFirstType,
        priceSecondType: priceSecondType,
        priceThirdType: priceThirdType,
        timeFirstType: timeFirstType,
        timeSecondType: timeSecondType,
        timeThirdType: timeThirdType,
        price_r_13: price_r_13,
        price_r_14: price_r_14,
        price_r_15: price_r_15,
        price_r_16: price_r_16,
        price_r_17: price_r_17,
        price_r_18: price_r_18,
        price_r_19: price_r_19,
        price_r_20: price_r_20,
        price_r_21: price_r_21,
        price_r_22: price_r_22,
        time_r_13: time_r_13,
        time_r_14: time_r_14,
        time_r_15: time_r_15,
        time_r_16: time_r_16,
        time_r_17: time_r_17,
        time_r_18: time_r_18,
        time_r_19: time_r_19,
        time_r_20: time_r_20,
        time_r_21: time_r_21,
        time_r_22: time_r_22,
        role: role,
        includedIn: includedIn
    };
    const response = await $authHost.post('/api/admin/createNewService', requestBody);
    return response.data;
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
                                      price, wheelR,
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

export const updateWashingService = async (priceFirstType, priceSecondType, priceThirdType,
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
    const response = await $authHost.put('/api/admin/updateWashingService', requestBody);
    return response.data;
};


export const updatePolishingService = async (priceFirstType, priceSecondType, priceThirdType,
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
    const response = await $authHost.put('/api/admin/updatePolishingService', requestBody);
    return response.data;
};


export const updateTireService = async (price_r_13, price_r_14, price_r_15, price_r_16, price_r_17,
                                        price_r_18, price_r_19, price_r_20, price_r_21, price_r_22,
                                        time_r_13, time_r_14, time_r_15, time_r_16, time_r_17,
                                        time_r_18, time_r_19, time_r_20, time_r_21, time_r_22, orderName) => {
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
        price_r_22: price_r_22,
        time_r_13: time_r_13,
        time_r_14: time_r_14,
        time_r_15: time_r_15,
        time_r_16: time_r_16,
        time_r_17: time_r_17,
        time_r_18: time_r_18,
        time_r_19: time_r_19,
        time_r_20: time_r_20,
        time_r_21: time_r_21,
        time_r_22: time_r_22
    };
    const response = await $authHost.put('/api/admin/updateTireService', requestBody);
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

export const getPriceAndFreeTime = async (orders, bodyType, orderType, wheelR, startTime, endTime) => {
    const requestBody = {
        orders: orders,
        bodyType: bodyType,
        orderType: orderType,
        wheelR: wheelR,
        startTime: startTime,
        endTime: endTime
    };
    const response = await $host.post('api/orders/getPriceAndEndTime', requestBody);
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
