import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import '../css/CreatingOrder.css';
import Modal from "react-bootstrap/Modal";
import {InputNumber} from 'rsuite';
import InputField from "../model/InputField";
import DataField from "../model/DataField";
import {createWashingOrder, getActualPolishingOrders, getPrice} from "../http/orderAPI";


const CreatingPolishingOrder = () => {
    const [itemsCount, setItemsCount] = useState([{name: '', value: 0}]);
    const [selectedItems, setSelectedItems] = useState([]);

    const [polishingOrders, setPolishingOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [userContacts, setUserContacts] = useState('');
    const styles = {marginBottom: 10};
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


    const getPriceAndTime = async (e) => {
        e.preventDefault();
        try {
            const response = await getPrice(selectedItems.map(i => i.replace(/ /g, '_')),
                carType, "polish", null);

            setPrice(response.price);
            setOrderTime(response.time);
        } catch (error) {
            alert(error);
        }
    };


    const handleCreateOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await createWashingOrder(selectedItems.map(i => i.replace(/ /g, '_')),
                userContacts, startTime.toISOString(), endTime.toISOString(),
                administrator, specialist, boxNumber, bonuses, comments, carNumber, carType, price);
            console.log(response)
        } catch (error) {
            alert(error);
        }
    };


    const handleGetOrders = async (event) => {
        event.preventDefault();
        try {
            const response = await getActualPolishingOrders();
            setPolishingOrders(response.orders.map(item => item.replace(/_/g, ' ')))
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Form onSubmit={handleGetOrders}>
                <div className='submit-container'>
                    <Button className='btn-submit' variant='primary' type='submit'>
                        Получить актуальные услуги полировки
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
                    {polishingOrders.sort().map(item => (
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
            {(
                <div className='selected-items-container text-center'>
                    <Form.Label style={{fontWeight: 'bold', fontSize: '1.2em'}}>
                        Доп услуги:
                    </Form.Label>
                    <div className='selected-items'>
                        {selectedItems.filter((item, index) => selectedItems.indexOf(item) === index).map(item => {
                            if (getItemValueByName(item) > 0) {
                                return (
                                    <span key={item} className='item'>
              {`${item} (${getItemValueByName(item)})`}
            </span>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}
            <Form onSubmit={getPriceAndTime}>
                <InputField
                    label='Тип кузова:'
                    id='carType'
                    value={carType}
                    onChange={setCarType}
                />
                <div className='submit-container'>
                    <Button className='btn-submit' variant='primary' type='submit'>
                        Посчитать цену и время
                    </Button>
                </div>
            </Form>

            <div className="label-container">
                <div className="price-label">Цена услуг: {price}</div>
                <div className="order-time-label">Время выполнения: {orderTime}</div>
            </div>

            <Form onSubmit={handleCreateOrder}>
                <InputField
                    label='Контакты клиента (можете записать сюда телефон, а потом сразу ФИО):'
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
                <DataField
                    startText="День начала заказа"
                    endText="Время начала заказа"
                    id='startTime'
                    value={startTime}
                    onChange={setStartTime}
                />
                <DataField
                    startText="День конца заказа"
                    endText="Время конца заказа"
                    id='startTime'
                    value={endTime}
                    onChange={setEndTime}
                />
                <div className='submit-container'>
                    <Button className='btn-submit' variant='primary' type='submit'>
                        Отправить
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default CreatingPolishingOrder;