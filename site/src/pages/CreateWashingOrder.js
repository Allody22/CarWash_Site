import React, {useCallback, useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import '../css/CreatingOrder.css';
import Modal from "react-bootstrap/Modal";
import {InputNumber, Message} from 'rsuite';
import InputField from "../model/InputField";
import DataField from "../model/DataField";
import {
    createWashingOrder,
    getActualWashingOrders,
    getBookedOrdersInTimeInterval,
    getPrice,
    getTableOrders
} from "../http/orderAPI";
import moment from "moment-timezone";


const CreatingWashingOrder = () => {
    const [showModal, setShowModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);
    const styles = {marginBottom: 10};
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);


    const [orderName, setOrderName] = useState('');
    const [itemsCount, setItemsCount] = useState([{name: '', value: 0}]);
    const [newTime, setNewTime] = useState([{startTime: null, endTime: null, box: 0}]);

    const [time, setTime] = useState([{startTime: null, endTime: null, box: 0}]);
    const [timeForCurrentDay, setTimeForCurrentDay] =
        useState([{startTime: null, endTime: null, box: 0}]);
    const [timeForCurrentDayClear, setTimeForCurrentDayClear] =
        useState([{startTime: null, endTime: null, box: 0}]);

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [box, setBox] = useState(null);

    const [stringTimeForCurrentDay, setStringTimeForCurrentDay] = useState([]);

    let [z, setZ] = useState(0);

    const [selectedItems, setSelectedItems] = useState([]);

    const [includedOrders, setIncludedOrders] = useState([]);
    const [connectedOrders, setConnectedOrders] = useState([]);
    const [userContacts, setUserContacts] = useState('');
    const [price, setPrice] = useState(0);
    const [orderTime, setOrderTime] = useState(0);
    const [bonuses, setBonuses] = useState(0);
    const [boxNumber, setBoxNumber] = useState(0);

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [carNumber, setCarNumber] = useState('');
    const [carType, setCarType] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [administrator, setAdministrator] = useState('');
    const [comments, setComments] = useState('');

    const handleGetPrice = async (e) => {
        e.preventDefault();
        console.log("Start of the get price ")
        try {
            let allOrders = []
            allOrders = [...selectedItems.map(i => i.replace(/ /g, '_')),
                ...includedOrders.map(item => item.replace(/ /g, '_'))];
            const response = await getPrice(allOrders,
                carType, "wash", null);

            setPrice(response.price);
            setOrderTime(response.time);
            // console.log(timeForCurrentDay)
        } catch (error) {
            alert('Произошла ошибка. Пожалуйста, повторите попытку позже.');
        }
        console.log("End of the get price ")
    }

    const fullDayIntervalTwoHour = (timeSkip) => {
        const newTimeData = [];

        for (let h = 8; h < 22; h += timeSkip) {
            const newStartTime = new Date(startTime);
            const newEndTime = new Date(startTime);
            newStartTime.setHours(h, 0, 0, 0)
            newEndTime.setHours(h + timeSkip, 0, 0, 0)

            newTimeData.push({startTime: newStartTime, endTime: newEndTime, box: 1});
            newTimeData.push({startTime: newStartTime, endTime: newEndTime, box: 2});
            newTimeData.push({startTime: newStartTime, endTime: newEndTime, box: 3});
        }

        for (let h = 9; h < 21; h += timeSkip) {
            const newStartTime = new Date(startTime);
            const newEndTime = new Date(startTime);
            newStartTime.setHours(h, 0, 0, 0)
            newEndTime.setHours(h + timeSkip, 0, 0, 0)

            newTimeData.push({startTime: newStartTime, endTime: newEndTime, box: 1});
            newTimeData.push({startTime: newStartTime, endTime: newEndTime, box: 2});
            newTimeData.push({startTime: newStartTime, endTime: newEndTime, box: 3});
        }

        setTimeForCurrentDay(newTimeData);
        setTimeForCurrentDayClear(newTimeData)
        console.log("Clear after 2 hours")
        console.log(timeForCurrentDayClear)
    }


    const fullDayIntervalOneHour = (timeSkip) => {
        const newTimeData = [];
        for (let h = 8; h < 22; h += timeSkip) {
            const newStartTime = new Date(startTime);
            const newEndTime = new Date(startTime);
            newStartTime.setHours(h, 0, 0, 0)
            newEndTime.setHours(h + timeSkip, 0, 0, 0)

            newTimeData.push({startTime: newStartTime, endTime: newEndTime, box: 1});
            newTimeData.push({startTime: newStartTime, endTime: newEndTime, box: 2});
            newTimeData.push({startTime: newStartTime, endTime: newEndTime, box: 3});
        }

        setTimeForCurrentDay(newTimeData);
        setTimeForCurrentDayClear(newTimeData)
        console.log("Clear after 1 hour")
        console.log(timeForCurrentDayClear)
    }

    const updateItem = (name, value) => {
        if (!checkIfItemExists(name)) {
            const newItemToAdd = {name: name, value: value};
            setItemsCount(prevItems => [...prevItems, newItemToAdd]);
        } else {
            setItemsCount(current =>
                current.map(item => {
                    if (item.name === name) {
                        return {...item, value};
                    } else {
                        return item;
                    }
                })
            );
        }
    };

    const getItemValueByName = (name) => {
        const item = itemsCount.find(item => item.name === name);
        return item ? item.value : undefined;
    }


    const checkIfItemExists = (name) => {
        const item = itemsCount.find(item => item.name === name);
        return !!item;
    };

    const removeItem = (name) => {
        setItemsCount(current =>
            current.filter(item => item.name !== name)
        );
    };

    useEffect(() => {
        const newSelectedItems = [];
        for (let item of itemsCount) {
            for (let i = 0; i < item.value; i++) {
                newSelectedItems.push(item.name);
            }
        }
        setSelectedItems(newSelectedItems);
    }, [itemsCount]);

    const handleItemChange = (item, value) => {
        updateItem(item, value);

        if (value === '0') {
            removeItem(item);
        }
    };

    const handleGetBookedOrders = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const start = new Date(startTime);
            const end = new Date(startTime);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            const response = await getBookedOrdersInTimeInterval(
                moment(start).toDate().toISOString(),
                moment(end).toDate().toISOString()
            );

            const timeData = response.orders.map((order) => ({
                startTime: new Date(order.startTime),
                endTime: order.endTime ? new Date(order.endTime) : null,
                box: order.boxNumber ? order.boxNumber : null,
            }));
            setTime(timeData);
            console.info(time)

            if (price <= 60) {
                fullDayIntervalOneHour(1)
            } else {
                fullDayIntervalTwoHour(2)
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    // const removeDuplicatesByStartTimeAndEndTime = () => {
    //     let testArray = timeForCurrentDayClear;
    //     const uniqueIndices = Object.values(testArray.reduce((acc, curr, i) => {
    //         const {startTime, endTime} = curr;
    //         const key = `${startTime}-${endTime}`;
    //         if (!acc[key]) {
    //             acc[key] = [];
    //         }
    //         acc[key].push(i);
    //         return acc;
    //     }, {})).map(indices => indices[0]);
    //
    //     const uniqueTimeForCurrentDay = testArray
    //         .filter((_, i) => uniqueIndices.includes(i));
    //     setNewTime(uniqueTimeForCurrentDay)
    // };

    // const isTimeExists = (start, end, box) => {
    //     let testArray = timeForCurrentDayClear;
    //     return testArray.some(item => {
    //         return item.startTime === start && item.endTime === end && item.box === box;
    //     });
    // }

    const isTimeExistsNewTime = (start, end, box) => {
        return newTime.some(item => {
            return item.startTime === start && item.endTime === end && item.box === box;
        });
    }


    useEffect(() => {
        updateStringTimeForCurrentDay()
        console.log('String time for current day')
        console.log(stringTimeForCurrentDay)
    }, [newTime]);

    const updateStringTimeForCurrentDay = () => {
        const timeStrings = newTime.map((time) => {
            const {startTime, endTime, box} = time;
            const start = new Date(startTime);
            const end = new Date(endTime);
            const startDateString = `${start.getFullYear()}/${start.getMonth() + 1}/${start.getDate()}/${start.getHours()}/${start.getMinutes()}/${start.getSeconds()}`;
            const endDateString = `${end.getFullYear()}/${end.getMonth() + 1}/${end.getDate()}/${end.getHours()}/${end.getMinutes()}/${end.getSeconds()}`;
            return `${startDateString} - ${endDateString}, box: ${box}`;
        });

        setStringTimeForCurrentDay(timeStrings);
    };

    const removeTime = (start, end, box) => {
        const filteredItems = timeForCurrentDayClear.filter((item) => {
            return !(item.startTime === start && item.endTime === end && item.box === box);
        });
        setTimeForCurrentDayClear(filteredItems)
    };
    //////ДАЛЬШЕ ТЕСТЫ

    // const removeDuplicatesByStartTimeAndEndTime = () => {
    //     const uniqueIndices = Object.values(timeForCurrentDayClear.reduce((acc, curr, i) => {
    //         const {startTime, endTime} = curr;
    //         const key = `${startTime}-${endTime}`;
    //         if (!acc[key]) {
    //             acc[key] = [];
    //         }
    //         acc[key].push(i);
    //         return acc;
    //     }, {})).map(indices => indices[0]);
    //
    //     const uniqueTimeForCurrentDay = timeForCurrentDayClear
    //         .filter((_, i) => uniqueIndices.includes(i));
    //     setNewTime(uniqueTimeForCurrentDay);
    // };

    const removeDuplicatesFromTimeForCurrentDayClear = () => {
        const uniqueIndices = Object.values(timeForCurrentDayClear.reduce((acc, curr, i) => {
            const {startTime, endTime} = curr;
            const key = `${startTime}-${endTime}`;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(i);

            return acc;
        }, {})).map(indices => indices[0]);

        const uniqueTimeForCurrentDayClear = timeForCurrentDayClear
            .filter((_, i) => uniqueIndices.includes(i));

        //setTimeForCurrentDayClear(uniqueTimeForCurrentDayClear);
        setNewTime(uniqueTimeForCurrentDayClear);

    };


    const isTimeExists = (start, end, box) => {
        return newTime.some(item => {
            return item.startTime === start && item.endTime === end && item.box === box;
        });
    };

    const isTimeExistsClearDays = (start, end, box) => {
        return timeForCurrentDayClear.some(item => {
            return item.startTime === start && item.endTime === end && item.box === box;
        });
    };

    useEffect(() => {
        if (start && end && box) {
            const filteredItems = timeForCurrentDayClear.filter((item) => {
                return !(item.startTime === start && item.endTime === end && item.box === box);
            });
            setTimeForCurrentDayClear(filteredItems)
            setTimeForCurrentDay(filteredItems)
            console.log('Time for current day clear in use effect')
            console.log(timeForCurrentDayClear)
        }
    }, [start, end, box]);


    const handleGetGoodTime = (e) => {
        e.preventDefault();
        let allCyclesCompleted = false;  // флаг для обозначения завершения циклов
        let filteredItems = timeForCurrentDay;

        for (let i = 0; i < time.length; i++) {
            for (let j = 0; j < filteredItems.length; j++) {
                const startTimeBooked = time[i].startTime.toISOString();
                const startTimeFree = filteredItems[j].startTime.toISOString();
                const endTimeBooked = time[i].endTime.toISOString();
                const endTimeFree = filteredItems[j].endTime.toISOString();
                if (((startTimeFree >= startTimeBooked && endTimeFree <= endTimeBooked && time[i].box === filteredItems[j].box)
                        || (startTimeFree <= startTimeBooked && endTimeFree <= endTimeBooked
                            && endTimeFree > startTimeBooked && time[i].box === filteredItems[j].box)
                        || (startTimeFree >= startTimeBooked && endTimeBooked <= endTimeFree
                            && startTimeFree < endTimeBooked && time[i].box === filteredItems[j].box))
                    && isTimeExistsClearDays(timeForCurrentDay[j].startTime, filteredItems[j].endTime, filteredItems[j].box)) {
                    removeTime(filteredItems[j].startTime, filteredItems[j].endTime, filteredItems[j].box)
                    // console.log(startTimeFree + "  " + endTimeFree, time[i].box)
                    // console.log(startTimeBooked + "  " + endTimeBooked, timeForCurrentDay[j].box)
                }
                if (i === time.length - 1 && j === filteredItems.length - 1) {
                    allCyclesCompleted = true;  // устанавливаем флаг, когда все циклы завершены
                }
            }

        }
        if (allCyclesCompleted){
            removeDuplicatesFromTimeForCurrentDayClear();  // вызываем функцию removeDuplicatesFromTimeForCurrentDayClear после завершения циклов
        }
        //updateStringTimeForCurrentDay()
        console.log('String days no test')
        console.log(stringTimeForCurrentDay)
        console.log('Clear days')
        console.log(timeForCurrentDayClear)

        console.log('new Time')
        console.log(newTime)
    };


    //ДАЛЬШЕ НОРМ КОД

    const handleGetOrders = async (event) => {
        console.log("Start of the get orders")
        event.preventDefault();
        try {
            const response = await getActualWashingOrders(orderName.replace(/\s+/g, '_'));

            setIncludedOrders(response.includedOrders.map(item => item.replace(/_/g, ' ')))
            setConnectedOrders(response.connectedOrders.map(item => item.replace(/_/g, ' ')))
        } catch (error) {
            console.error(error);
        }
        console.log("End of the get orders")
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        try {
            let allOrders = []
            allOrders = [...selectedItems.map(i => i.replace(/ /g, '_')),
                ...includedOrders.map(item => item.replace(/ /g, '_'))];
            const response = await createWashingOrder(allOrders, userContacts, moment(startTime).toDate().toISOString(),
                moment(endTime).toDate().toISOString(),
                administrator, specialist, boxNumber, bonuses, comments, carNumber, carType, price);

            //setResponse(orderInfoString);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        } catch (error) {
            alert(error);
        }
    };


    const handleOpenNewModal = () => setShowNewModal(true);
    const handleCloseNewModal = () => setShowNewModal(false);

    return (
        <>
            <Form onSubmit={handleGetOrders}>
                <InputField
                    label='Название типа мойки:'
                    id='orderName'
                    value={orderName}
                    onChange={setOrderName}
                />
                <div className='submit-container'>
                    <Button className='btn-submit' variant='primary' type='submit'>
                        Найти связанные с этой услугой заказы
                    </Button>
                </div>
            </Form>

            <Button className='full-width' variant='secondary' onClick={handleOpenModal}>
                Выберите услуги
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} className='my-custom-class'>
                <Modal.Header closeButton>
                    <Modal.Title>Выберите заказы</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {connectedOrders.sort().map(item => (
                        <div key={item}>
                            <span className='text'>{item}</span>
                            <InputNumber
                                size="md"
                                style={styles}
                                min={0}
                                onChange={value => handleItemChange(item, value)}
                                value={getItemValueByName(item) || 0}
                            />
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            {selectedItems.length > 0 ? (
                <div className="selected-items-container text-center">
                    <Form.Label style={{fontWeight: "bold", fontSize: "1.2em"}}>
                        Доп услуги:
                    </Form.Label>
                    <div className="selected-items">
                        {selectedItems
                            .filter((item, index) => selectedItems.indexOf(item) === index)
                            .map((item) => {
                                if (getItemValueByName(item) > 0) {
                                    return (
                                        <span key={item} className="item">
                  {`${item} (${getItemValueByName(item)})`}
                </span>
                                    );
                                }
                                return null;
                            })}
                    </div>
                </div>
            ) : (
                <div className='selected-items-container text-center'>
                    <Form.Label style={{fontWeight: 'bold', fontSize: '1.2em'}}>
                        Дополнительные услуги:
                    </Form.Label>
                    <div className='selected-items-container text-center'>
                        <span className='empty-list' style={{fontSize: '1.1em'}}>
                            Нет дополнительных услуг
                        </span>
                    </div>
                </div>
            )
            }
            {includedOrders.length > 0 ? (
                <div className='selected-items-container text-center'>
                    <Form.Label style={{fontWeight: 'bold', fontSize: '1.2em'}}>
                        В этот заказ уже включены:
                    </Form.Label>
                    <div className='selected-items'>
                        {includedOrders.map((item, index) => (
                            <span key={index} className='item'>
          {item.replace(/_/g, ' ')}
        </span>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='selected-items-container text-center'>
                    <Form.Label style={{fontWeight: 'bold', fontSize: '1.2em'}}>
                        В этот заказ уже включены:
                    </Form.Label>
                    <div className='selected-items-container text-center'>
                        <span className='empty-list' style={{fontSize: '1.1em'}}>
                            Нет включенных заказов
                        </span>
                    </div>
                </div>
            )}

            <Form onSubmit={handleGetPrice}>
                <InputField
                    label='Тип кузова:'
                    id='carType'
                    value={carType}
                    onChange={setCarType}
                />
                <div className='submit-container'>
                    <Button className='btn-submit' variant='primary' type='submit'>
                        Узнать цену
                    </Button>
                </div>
            </Form>

            <form onSubmit={handleGetBookedOrders}>
                <div>
                    <label htmlFor="selected-date" className="btn-date">Выбранная дата:</label>
                    <div className="btn-date">
                        <input
                            type="date"
                            id="startTime"
                            value={startTime.toISOString().substr(0, 10)}
                            onChange={(event) => setStartTime(new Date(event.target.value))}
                        />
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={loading} className="btn-find">
                        {loading ? 'Loading...' : 'День заказа'}
                    </button>
                </div>
            </form>

            <div className="label-container">
                <div className="price-label">Цена услуг: {price}</div>
                <div className="order-time-label">Время выполнения: {orderTime}</div>
            </div>
            {/* отображаем сообщение */}
            {showMessage && (
                <div className={"my-class"}
                >
                    {<p>{"Заказ успешно добавлен на" + startTime}</p>}
                </div>
            )}
            <Form onSubmit={handleCreateOrder}>
                <InputField
                    label='Номер телефона клиента:'
                    id='name'
                    value={userContacts}
                    onChange={setUserContacts}
                />
                <InputField
                    label='Номер автомобиля:'
                    id='carNumber'
                    value={carNumber}
                    onChange={setCarNumber}
                />
                <InputField
                    label='Специалист:'
                    id='specialist'
                    value={specialist}
                    onChange={setSpecialist}
                />
                <InputField
                    label='Администратор:'
                    id='administrator'
                    value={administrator}
                    onChange={setAdministrator}
                />
                <InputField
                    label='Номер бокса:'
                    id='boxNumber'
                    value={boxNumber}
                    onChange={setBoxNumber}
                />
                <InputField
                    label='Количество использованных бонусов:'
                    id='bonuses'
                    value={bonuses}
                    onChange={setBonuses}
                />
                <InputField
                    label='Комментарии:'
                    id='comments'
                    value={comments}
                    onChange={setComments}
                />
                <div className='submit-container'>
                    <Button className='btn-submit' variant='primary' type='submit'>
                        Сделать заказ
                    </Button>
                </div>
            </Form>
            <Button className='full-width' variant='secondary' onClick={handleGetGoodTime}>
                Получить хорошее время на сегодня
            </Button>
            <Button className='full-width' variant='secondary' onClick={handleOpenNewModal}>
                Список времени
            </Button>

            <Modal show={showNewModal} onHide={handleCloseNewModal} className='my-custom-class'>
                <Modal.Header closeButton>
                    <Modal.Title>Доступное время</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {stringTimeForCurrentDay.sort().map(item => (
                        <div key={item}>
                            <span className='text'>{item}</span>
                            <InputNumber
                                size="md"
                                style={styles}
                                min={0}
                                //onChange={value => handleItemChange(item, value)}
                                //value={getItemValueByName(item) || 0}
                            />
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseNewModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreatingWashingOrder;