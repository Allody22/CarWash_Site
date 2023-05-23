import '../css/CreatingOrder.css';
import {updateUserInfo} from "../http/userAPI";
import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import '../css/CreatingOrder.css';
import Modal from "react-bootstrap/Modal";
import InputField from "../model/InputField";
import {useHistory} from "react-router-dom";
import DataField from "../model/DataField";

const UpdateOrderInfo = () => {
    const history = useHistory()
    const [fullName, setFullName] = useState('');
    const [orderId, setOrderId] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [price, setPrice] = useState(0);
    const [orderType, setOrderType] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [administrator, setAdministrator] = useState('');
    const [autoNumber, setAutoNumber] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [autoType, setAutoType] = useState(0);
    const [boxNumber, setBoxNumber] = useState(0);
    const [bonuses, setBonuses] = useState(0);
    const [comments, setComments] = useState('');
    const [executed, setExecuted] = useState(false);

    const sendUpdateRequest = async () => {
        try {
            //const data = await updateUserInfo(email, username, fullName, enSelectedRoles);
            //alert(data);
        } catch (error) {
            //console.log(email, username, fullName, enSelectedRoles)
            console.log(error)
            alert(error);
        }
    };


    return (
        <>
            <Form onSubmit={sendUpdateRequest}>
                <InputField
                    label='Айди заказа'
                    id='orderId'
                    value={orderId}
                    onChange={setOrderId}
                    style={{ marginTop: '20px' }}
                />
                <InputField
                    label='Телефон пользователя:'
                    id='userPhone'
                    value={userPhone}
                    onChange={setUserPhone}
                />
                <InputField
                    label='Тип заказа (шиномонтаж, мойки, полировка):'
                    id='orderType'
                    value={orderType}
                    onChange={setOrderType}
                />
                <InputField
                    label='Цена за заказ (целое число):'
                    id='price'
                    value={price}
                    onChange={setPrice}
                />
                <InputField
                    label='Администратор:'
                    id='administrator'
                    value={administrator}
                    onChange={setAdministrator}
                />
                <InputField
                    label='Специалист:'
                    id='specialist'
                    value={specialist}
                    onChange={setSpecialist}
                />
                <InputField
                    label='Тип автомобиля (перевести в число) (седан, кроссовер, джип):'
                    id='administrator'
                    value={autoType}
                    onChange={setAutoType}
                />
                <InputField
                    label='Номер автомобиля:'
                    id='autoNumber'
                    value={autoNumber}
                    onChange={setAutoNumber}
                />
                <InputField
                    label='Номер бокса:'
                    id='boxNumber'
                    value={boxNumber}
                    onChange={setBoxNumber}
                />
                <DataField
                    startText = 'День начала заказа'
                    endText = 'Время начала заказа'
                    id='startTime'
                    value={startTime}
                    onChange={setStartTime}
                />
                <DataField
                    startText = 'День конца заказа'
                    endText = 'Время конца заказа'
                    id='endTime'
                    value={endTime}
                    onChange={setEndTime}
                />
                <InputField
                    label='Комментарии клиента:'
                    id='comments'
                    value={comments}
                    onChange={setComments}
                />
                <InputField
                    label='Выполнен ли заказ (стринг в булеан) (да или нет):'
                    id='executed'
                    value={executed}
                    onChange={setExecuted}
                />
                <InputField
                    label='Использованные клиентом бонусы:'
                    id='bonuses'
                    value={bonuses}
                    onChange={setBonuses}
                />
                <div className='submit-container'>
                    <Button className='btn-submit' variant='primary' type='submit'>
                        Изменить информацию
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default UpdateOrderInfo;