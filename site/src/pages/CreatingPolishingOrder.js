import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import '../css/CreatingOrder.css';
import '../css/NewStyles.css';
import {DatePicker} from 'rsuite';

import addDays from 'date-fns/addDays';
import {Divider} from 'rsuite';

import 'rsuite/dist/rsuite.css';

import Modal from "react-bootstrap/Modal";

import {InputNumber, InputPicker} from 'rsuite';
import InputField from "../model/InputField";
import {
    createPolishingOrder,
    getActualPolishingOrders,
    getPriceAndFreeTime
} from "../http/orderAPI";


const carTypesArray = [
    '1 тип - седан',
    '2 тип - кроссовер',
    '3 тип - джип',
    'Неизвестно'
].map(item => ({label: item, value: item}));

const smallInputStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
}

const styles = {
    width: 500, display: 'block',
    marginBottom: 10, marginLeft: 'auto', marginRight: 'auto', marginTop: 10
};

const stylesForInput = {
    width: 190, marginBottom: 10, marginTop: 5
};

const inputStyle = {
    fontWeight: 'bold', display: 'flex',
    fontSize: '17px', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
}

const CreatingPolishingOrder = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitTime, setSubmitTime] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [itemsCount, setItemsCount] = useState([{name: '', value: 0}]);
    const [newTime, setNewTime] = useState([{startTime: null, endTime: null, box: 0}]);

    const [stringTimeForCurrentDay, setStringTimeForCurrentDay] = useState([]);


    const [selectedItems, setSelectedItems] = useState([]);

    const [includedOrders, setIncludedOrders] = useState([]);
    const [connectedOrders, setConnectedOrders] = useState([]);

    const [userContacts, setUserContacts] = useState('');
    const [price, setPrice] = useState(0);


    const [orderTime, setOrderTime] = useState(0);
    const [bonuses, setBonuses] = useState(0);
    const [boxNumber, setBoxNumber] = useState(0);

    const [startTime, setStartTime] = useState(new Date());
    const start = new Date(startTime);
    const end = new Date(startTime);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    const [endTime, setEndTime] = useState('');

    const [requestEndTime, setRequestEndTime] = useState(new Date());
    const [requestStartTime, setRequestStartTime] = useState(new Date());


    const [carNumber, setCarNumber] = useState('');
    const [carTypeMap, setCarTypeMap] = useState('');
    const [carType, setCarType] = useState(0);
    const [specialist, setSpecialist] = useState('');
    const [administrator, setAdministrator] = useState('');
    const [comments, setComments] = useState('');

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

    const mapCarTypeToCode = (newCarType) => {
        switch (newCarType) {
            case "1 тип - седан":
                return 1;
            case "2 тип - кроссовер":
                return 2;
            case "3 тип - джип":
                return 3;
            default:
                return -1;
        }
    };

    useEffect(() => {
        const carCode = mapCarTypeToCode(carTypeMap);
        setCarType(carCode);
    }, [carTypeMap]);


    const handleGetPrice = async (e) => {
        e.preventDefault();
        try {
            let allOrders = []
            allOrders = [...selectedItems.map(i => i.replace(/ /g, '_')),
                ...includedOrders.map(item => item.replace(/ /g, '_'))];

            const response = await getPriceAndFreeTime(allOrders,
                carType, "polishing", null, start.toISOString(), end.toISOString());

            setPrice(response.price);
            setOrderTime(response.time);

            const newTimeArray = response.availableTime.map(time => ({
                startTime: time.startTime,
                endTime: time.endTime,
                box: time.box
            }));

            setNewTime(newTimeArray);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("Системная ошибка, попробуйте позже")
            }
        }
    }


    useEffect(() => {
        updateStringTimeForCurrentDay()
    }, [newTime]);

    const updateStringTimeForCurrentDay = () => {
        const timeStrings = newTime.map((time) => {
            const {startTime, endTime, box} = time;
            const start = new Date(startTime);
            const end = new Date(endTime);
            const startDateString = `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`;
            const endDateString = `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
            return `${startDateString} - ${endDateString}, бокс: ${box}`;
        });

        setStringTimeForCurrentDay(timeStrings);
    };


    useEffect(() => {
        async function getOrders() {
            try {
                const response = await getActualPolishingOrders();
                setConnectedOrders(response.orders.map(item => item.replace(/_/g, ' ')));
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("Системная ошибка, попробуйте позже")
                }
            }
        }

        getOrders();
    }, []);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        updateStartEndTimeAndBox()
    }, [endTime]);

    const updateStartEndTimeAndBox = () => {
        const [timeStr, boxStr] = endTime.split(",");
        const [startStr, endStr] = timeStr.trim().split(" - ");

        const year = startTime.getFullYear();
        const month = startTime.getMonth() + 1;
        const day = startTime.getDate();

        const formattedDate = `${year}-${month}-${day}`;

        const start = new Date(`${formattedDate} ${startStr}`);
        const end = new Date(`${formattedDate} ${endStr}`);
        const boxNumber = boxStr ? parseInt(boxStr.match(/\d+/)[0]) : null; // проверяем наличие запятой в строке

        setRequestStartTime(start);
        setRequestEndTime(end);

        setBoxNumber(boxNumber);
    };


    const handleCreateOrder = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        setSubmitTime(Date.now());
        try {
            let allOrders = []
            allOrders = [...selectedItems.map(i => i.replace(/ /g, '_')),
                ...includedOrders.map(item => item.replace(/ /g, '_'))];

            const response = await createPolishingOrder(allOrders, userContacts, requestStartTime.toISOString(),
                requestEndTime.toISOString(),
                administrator, specialist, boxNumber, bonuses, comments, carNumber, carType, price);

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("Системная ошибка, попробуйте позже")
            }
        } finally {
            setTimeout(() => setIsSubmitting(false), 4000);
        }
    };

    const predefinedBottomRanges = [
        {
            label: 'Сегодня',
            value: new Date(),
        },
        {
            label: 'Завтра',
            value: addDays(new Date(), 1),
        },
        {
            label: 'Послезавтра',
            value: addDays(new Date(), 2),
        },
    ];
    const timeStringToMinutes = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return parseInt(hours) * 60 + parseInt(minutes);
    };

    const compareTimeIntervals = (a, b) => {
        // Извлекаем время начала интервала из строки и парсим его в минуты, прошедшие с полуночи
        const aStartTime = timeStringToMinutes(a.split(' - ')[0]);
        const bStartTime = timeStringToMinutes(b.split(' - ')[0]);
        if (aStartTime < bStartTime) {
            return -1;
        }
        if (aStartTime > bStartTime) {
            return 1;
        }
        // Если время начала интервала одинаково, то сортируем по времени окончания
        const aEndTime = timeStringToMinutes(a.split(' - ')[1]);
        const bEndTime = timeStringToMinutes(b.split(' - ')[1]);
        if (aEndTime < bEndTime) {
            return -1;
        }
        if (aEndTime > bEndTime) {
            return 1;
        }
        // Если интервалы одинаковы, то сортируем по боксу
        return a.localeCompare(b);
    };

    return (
        <>
            <p style={{...inputStyle,marginTop:'15px'}}>Страница добавления заказов на полировку</p>
            <p style={smallInputStyle}>Здесь вы можете сами создать какой-то заказ
                на полировку из всех актуальных услуг, а потом получить всю информацию о нём</p>
            <p style={smallInputStyle}> &nbsp;<strong>Обязательно</strong>&nbsp;выберите время заказа, тип кузова и набор услуг</p>

            <Button className='full-width' variant='secondary' onClick={handleOpenModal}>
                Выберите услуги
            </Button>
            <Modal show={showModal}
                   onHide={handleCloseModal}
                   dialogClassName="custom-modal-dialog-polishing">
                <Modal.Header closeButton>
                    <Modal.Title>Выберите заказы</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {connectedOrders.sort().map(item => (
                        <div key={item}
                             style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'space-between',
                                 fontSize: '16px'
                             }}>
                            <span className='text' style={{marginRight: '8px'}}>{item}</span>
                            <InputNumber
                                size="sm"
                                placeholder="sm"
                                style={stylesForInput}
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
            <Divider></Divider>
            <p style={{
                fontWeight: 'bold', display: 'flex',
                fontSize: '17px', justifyContent: 'center', alignItems: 'center', marginTop: '15px'
            }}>Выберите тип кузова</p>
            <InputPicker
                data={carTypesArray}
                value={carTypeMap}
                onChange={setCarTypeMap}
                style={{...styles, WebkitTextFillColor: "#000000"}}
                menuStyle={{fontSize: "17px"}}
            />

            <p style={{
                fontWeight: 'bold', display: 'flex', fontSize: '17px', justifyContent: 'center',
                alignItems: 'center', marginTop: '15px'
            }}>Выберите день заказа</p>
            <DatePicker
                format="yyyy-MM-dd"
                oneTap
                ranges={predefinedBottomRanges}
                block
                appearance="default"
                value={startTime}
                onChange={setStartTime}
                style={{
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,
                    WebkitTextFillColor: "#000000",
                }}
            />

            <Button className='full-width' appearance="primary" block onClick={handleGetPrice}>
                Узнать цену заказа, время и доступное расписание
            </Button>

            <div className="label-container">
                <div className="price-label">Цена услуг: {price}</div>
                <div className="order-time-label">Время выполнения: {orderTime}</div>
            </div>

            <p style={{
                fontWeight: 'bold', display: 'flex', fontSize: '17px', justifyContent: 'center',
                alignItems: 'center', marginTop: '15px'
            }}>Расписание с доступным временем</p>

            <InputPicker
                data = {stringTimeForCurrentDay.sort(compareTimeIntervals).map((item) => ({ label: item, value: item }))}
                style={{
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    WebkitTextFillColor: "#000000",
                    display: 'flex',
                }}
                menuStyle={{fontSize: "17px"}} // ваш класс стилей здесь
                value={endTime}
                onChange={(value) => {
                    setEndTime(value);
                }}
            />
            <Form onSubmit={handleCreateOrder}>
                <InputField
                    label='Номер телефона клиента:'
                    id='name'
                    value={userContacts}
                    inputStyle= {inputStyle}
                    onChange={setUserContacts}
                />
                <InputField
                    label='Номер автомобиля:'
                    id='carNumber'
                    inputStyle= {inputStyle}
                    value={carNumber}
                    onChange={setCarNumber}
                />
                <InputField
                    label='Специалист:'
                    inputStyle= {inputStyle}
                    id='specialist'
                    value={specialist}
                    onChange={setSpecialist}
                />
                <InputField
                    label='Администратор:'
                    id='administrator'
                    inputStyle= {inputStyle}
                    value={administrator}
                    onChange={setAdministrator}
                />
                <InputField
                    label='Количество использованных бонусов:'
                    id='bonuses'
                    inputStyle= {inputStyle}
                    value={bonuses}
                    onChange={setBonuses}
                />
                <InputField
                    label='Комментарии:'
                    id='comments'
                    inputStyle= {inputStyle}
                    value={comments}
                    onChange={setComments}
                />

                <div className='submit-container'>
                    <Button
                        className='btn-submit'
                        variant='primary'
                        type='submit'
                        disabled={isSubmitting || Date.now() < submitTime + 4000}
                        style={{marginBottom: '20px', marginTop: '20px'}}>
                        {isSubmitting ? 'Обработка заказа...' : 'Сделать заказ'}
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default CreatingPolishingOrder;