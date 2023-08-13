import {$authHost} from "./index";


export const getOrderInfo = async (orderId) => {
    const response = await $authHost.get('/api/orders/management/getOrderInfo?orderId=' + orderId);
    return await response.data;
};

export const getActualWashingOrders = async (orderName) => {
    const response = await $authHost.get('/api/orders/management/getActualWashingOrders?orderName=' + encodeURIComponent(orderName));
    return await response.data;
};

export const getServiceInfo = async (orderName, orderType) => {
    const response = await $authHost.get('/api/orders/management/getServiceInfo?orderName='
        + encodeURIComponent(orderName) + '&orderType=' + encodeURIComponent(orderType));
    return await response.data;
};

export const deleteOrderById = async (orderId) => {
    const response = await $authHost.post('/api/orders/management/deleteOrder?orderId='
        + encodeURIComponent(orderId));
    return await response.data;
};

export const getAllWashingServicesWithPriceAndTime = async () => {
    const response = await $authHost.get('/api/orders/management/getAllWashingServicesWithPriceAndTime');
    return await response.data;
};

export const getAllPolishingServicesWithPriceAndTime = async () => {
    const response = await $authHost.get('/api/orders/management/getAllPolishingServicesWithPriceAndTime');
    return await response.data;
};

export const getAllTireServicesWithPriceAndTime = async () => {
    const response = await $authHost.get('/api/orders/management/getAllTireServicesWithPriceAndTime');
    return await response.data;
};

export const getAllWashingOrders = async () => {
    const response = await $authHost.get('/api/orders/management/getAllWashingOrders');
    return await response.data;
};

export const getActualPolishingOrders = async () => {
    const response = await $authHost.get('/api/orders/management/getActualPolishingOrders');
    return await response.data;
};

export const getActualTireOrders = async () => {
    const response = await $authHost.get('/api/orders/management/getActualTireOrders');
    return await response.data;
};

export const getOrdersBookedInOneDay = async (startTime, endTime, flag) => {
    const {data: {orders}} = await $authHost.get('/api/orders/management/getBookedTimeInOneDay?startTime='
        + encodeURIComponent(startTime) + '&endTime=' + encodeURIComponent(endTime) + "&includeCancelled=" + flag );
    return await orders;
};

export const getOrdersCreatedInOneDay = async (startTime, endTime, flag) => {
    const {data: {orders}} = await $authHost.get('/api/orders/management/getOrderCreatedAt?startTime='
        + encodeURIComponent(startTime) + '&endTime=' + encodeURIComponent(endTime) + "&includeCancelled=" + flag);
    return await orders;
};

export const getNotMadeOrders = async (flag) => {
    const {data: {orders}} = await $authHost.get('api/orders/management/getNotMadeOrders?includeCancelled=' + flag);
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
    const response = await $authHost.post('/api/admin/services/createNewService', requestBody);
    return response.data;
};


export const createTireOrder = async (orders, userContacts, wheelR, startTime,
                                      endTime, administrator, specialist, boxNumber,
                                      bonuses, comments, autoNumber,
                                      autoType, price, currentStatus) => {
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
        price: price,
        currentStatus: currentStatus
    };
    const response = await $authHost.post('api/orders/new/createTireOrder', requestBody);
    return response.data;
};


export const updateOrderInfo = async (orderId, userPhone, orderType,
                                      price, wheelR,
                                      startTime, administrator, autoNumber,
                                      autoType, specialist, boxNumber, bonuses,
                                      comments, executed, endTime, orders, currentStatus) => {
    const requestBody = {
        orderId: orderId,
        userPhone: userPhone,
        orderType: orderType,
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
        executed: executed,
        orders: orders,
        currentStatus: currentStatus
    };
    const response = await  $authHost.post('api/orders/management/updateOrderInfo', requestBody);
    return response.data;
};

export const createWashingOrder = async (orders, userContacts, startTime,
                                         endTime, administrator, specialist, boxNumber,
                                         bonuses, comments, autoNumber, autoType,
                                         price, currentStatus) => {
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
        price: price,
        currentStatus: currentStatus
    };
    const response = await $authHost.post('api/orders/new/createWashingOrder', requestBody);
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
    const response = await $authHost.put('/api/admin/services/updateWashingService', requestBody);
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
    const response = await $authHost.put('/api/admin/services/updatePolishingService', requestBody);
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
    const response = await $authHost.put('/api/admin/services/updateTireService', requestBody);
    return response.data;
};


export const createPolishingOrder = async (orders, userContacts, startTime,
                                           endTime, administrator, specialist, boxNumber,
                                           bonuses, comments, autoNumber, autoType, price, currentStatus) => {
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
        price: price,
        currentStatus: currentStatus
    };
    const response = await $authHost.post('api/orders/new/createPolishingOrder', requestBody);
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
    const response = await $authHost.post('api/orders/management/getPriceAndEndTime', requestBody);
    return response.data;
};


export const getBookedOrdersInTimeInterval = async (startTime, endTime) => {
    const requestBody = {
        startTime: startTime,
        endTime: endTime
    };
    const response = await $authHost.post('api/orders/management/getBookedTimeInOneDay', requestBody);
    return response.data;
};
