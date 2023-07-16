import '../css/CreatingOrder.css';
import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import '../css/CreatingOrder.css';
import InputField from "../model/InputField";
import {useParams} from "react-router-dom";
import {deleteOrderById, getOrderInfo, updateOrderInfo} from "../http/orderAPI";
import orderTypeMap from "../model/map/OrderTypeMapFromEnglish";
import {DatePicker, InputPicker, Notification, useToaster} from "rsuite";
import addDays from "date-fns/addDays";

const wheelSizeArray = [
    'R13', 'R14', 'R15', 'R16', 'R17', 'R18', 'R19', 'R20', 'R21', 'R22'].map(item => ({label: item, value: item}));

const smallInputStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
}

const carTypesArray = [
    '1 тип - седан',
    '2 тип - кроссовер',
    '3 тип - джип',
    'Неизвестно'
].map(item => ({label: item, value: item}));

const executedArray = [
    'Заказ был выполнен',
    'Заказ не был выполнен',
].map(item => ({label: item, value: item}));

const inputStyle = {
    fontWeight: 'bold', display: 'flex',
    fontSize: '17px', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
}

const UpdateOrderInfo = () => {
        const [userPhone, setUserPhone] = useState('');
        const [wheelR, setWheelR] = useState('');
        const [price, setPrice] = useState(0);
        const [orderType, setOrderType] = useState('');
        const [startTime, setStartTime] = useState(new Date());
        const [endTime, setEndTime] = useState(new Date());
        const [administrator, setAdministrator] = useState('');
        const [autoNumber, setAutoNumber] = useState('');
        const [specialist, setSpecialist] = useState('');
        const [carTypeMap, setCarTypeMap] = useState('');
        const [carType, setCarType] = useState(0);
        const toaster = useToaster();


        const [boxNumber, setBoxNumber] = useState(0);
        const [bonuses, setBonuses] = useState(0);
        const [comments, setComments] = useState('');
        const [executed, setExecuted] = useState('');
        const [executedToCode, setExecutedToCode] = useState(false);

        const [errorResponse, setErrorResponse] = useState();
        const [errorFlag, setErrorFlag] = useState(false);

        const [successResponse, setSuccessResponse] = useState();

        const [isSubmitting, setIsSubmitting] = useState(false);
        const [submitTime, setSubmitTime] = useState(0);
        const [showConfirmation, setShowConfirmation] = useState(false);


        const {id} = useParams();
        const [orderId, setOrderId] = useState('')

        useEffect(() => {
                async function getThisOrderInfo() {
                    try {
                        if (!isNaN(id)) {
                            const response = await getOrderInfo(parseInt(id));

                            const responseCarType = mapCarTypeCodeToString(response.autoType)
                            setCarTypeMap(responseCarType)

                            setOrderId(response.id)
                            setAutoNumber(response.autoNumber)
                            setAdministrator(response.administrator)
                            setSpecialist(response.specialist)
                            setBonuses(response.bonuses)
                            setBoxNumber(response.boxNumber)
                            setPrice(response.price)
                            setComments(response.comments)

                            const startTime = new Date(response.startTime);
                            setStartTime(startTime)
                            const endTime = new Date(response.endTime);
                            setEndTime(endTime)

                            setUserPhone(response.userNumber)
                            setOrderType(() => response.orderType ? orderTypeMap[response.orderType] || response.orderType : "Неизвестно")
                            setWheelR(response.wheelR)
                            console.log(response)
                        }
                    } catch
                        (error) {
                        if (error.response) {
                            setErrorResponse(error.response.data.message)
                            setErrorFlag(flag => !flag)
                        } else {
                            setErrorResponse("Системная ошибка, проверьте правильность " +
                                "введённой информации и попробуйте еще раз")
                            setErrorFlag(flag => !flag)
                        }
                    }
                }

                getThisOrderInfo();
            }, []
        );

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

        const mapCarTypeCodeToString = (newCarType) => {
            if (newCarType === 1) {
                return "1 тип - седан"
            } else if (newCarType === 2) {
                return "2 тип - кроссовер"
            } else if (newCarType === 3) {
                return "1 тип - джип"
            } else {
                return "Неизвестно"
            }
        };

        useEffect(() => {
            const carCode = mapCarTypeToCode(carTypeMap);
            setCarType(carCode);
        }, [carTypeMap]);

        const mapExecutedToCode = (currentExecuted) => {
            switch (currentExecuted) {
                case "Заказ был выполнен":
                    return true;
                case "Заказ не был выполнен":
                    return false;
                default:
                    return false;
            }
        };

        const errorIdMessage = (
            <Notification
                type="error"
                header="Ошибка!"
                closable
                style={{border: '1px solid black'}}
            >
                <div style={{width: 320}}>
                    <p>Пожалуйста, введите номер заказа.</p>
                </div>
            </Notification>
        );

        const errorResponseMessage = (
            <Notification
                type="error"
                header="Ошибка!"
                closable
                style={{border: '1px solid black'}}
            >
                <div style={{width: 320}}>
                    {errorResponse}
                </div>
            </Notification>
        );

        useEffect(() => {
            if (errorResponse) {
                toaster.push(errorResponseMessage, {placement: "bottomEnd"});
            }
        }, [errorFlag]);

        const mapExecutedToString = (currentExecuted) => {
            if (currentExecuted) {
                return "Заказ был выполнен"
            } else {
                return "Заказ не был выполнен"
            }
        };

        useEffect(() => {
            const executedToCode = mapExecutedToCode(executed);
            setExecutedToCode(executedToCode)
        }, [executed]);

        const successMessage = (
            <Notification
                type="success"
                header="Успешно!"
                closable
                style={{border: '1px solid black'}}
            >
                <div style={{width: 320}}>
                    <p>{successResponse}</p>
                </div>
            </Notification>
        );

        useEffect(() => {
            if (successResponse) {
                toaster.push(successMessage, {placement: "bottomEnd"});
            }
        }, [successResponse]);

        const sendUpdateRequest = async (e) => {
            e.preventDefault();
            try {
                const data = await updateOrderInfo(orderId, userPhone, orderType,
                    price, wheelR, startTime.toISOString(), administrator,
                    autoNumber, carType, specialist, boxNumber, bonuses, comments, executedToCode, endTime.toISOString());
                setSuccessResponse(data.message)
            } catch
                (error) {
                if (error.response) {
                    setErrorResponse(error.response.data.message)
                    setErrorFlag(flag => !flag)
                } else {
                    setErrorResponse("Системная ошибка, проверьте правильность " +
                        "введённой информации и попробуйте еще раз")
                    setErrorFlag(flag => !flag)
                }
            }
        };

        function isNumberString(str) {
            return /^[0-9]+$/.test(str);
        }

        useEffect(() => {
            if (showConfirmation && !isNumberString(orderId)) {
                setShowConfirmation(false)
                toaster.push(errorIdMessage, {placement: "bottomEnd"});
            }
        }, [showConfirmation]);

        const deleteOrder = async (e) => {
            e.preventDefault();
            if (showConfirmation && isNumberString(orderId)) {
                try {
                    const data = await deleteOrderById(orderId);
                    setSuccessResponse(data.message)
                } catch
                    (error) {
                    if (error.response) {
                        setErrorResponse(error.response.data.message)
                        setErrorFlag(flag => !flag)
                    } else {
                        setErrorResponse("Системная ошибка, проверьте правильность " +
                            "введённой информации и попробуйте еще раз")
                        setErrorFlag(flag => !flag)
                    }
                }
                setShowConfirmation(false);
            } else {
                setShowConfirmation(true);
            }
        };


        const predefinedBottomRanges = [
            {
                label: 'Вчера',
                value: addDays(new Date(), -1),
            },
            {
                label: 'Сегодня',
                value: new Date(),
            },
            {
                label: 'Завтра',
                value: addDays(new Date(), 1),
            }
        ];


        return (
            <>
                <p style={{...inputStyle, marginTop: '15px'}}>Страница изменения информации о заказе</p>
                <p style={smallInputStyle}>Вы можете открыть таблицу с заказами за какой-то день,
                    выбрать там заказ, информацию о котором хотите обновить, а он сам окажется здесь</p>


                <Form onSubmit={sendUpdateRequest}>
                    <InputField
                        inputStyle={inputStyle}
                        label='Айди заказа'
                        id='orderId'
                        value={orderId}
                        onChange={setOrderId}
                    />
                    <InputField
                        inputStyle={inputStyle}
                        label='Телефон пользователя:'
                        id='userPhone'
                        value={userPhone}
                        onChange={setUserPhone}
                    />
                    <InputField
                        inputStyle={inputStyle}
                        label='Тип заказа (шиномонтаж, мойки, полировка):'
                        id='orderType'
                        value={orderType}
                        onChange={setOrderType}
                    />
                    <InputField
                        inputStyle={inputStyle}
                        label='Цена за заказ (целое число):'
                        id='price'
                        value={price}
                        onChange={setPrice}
                    />
                    <InputField
                        inputStyle={inputStyle}
                        label='Администратор:'
                        id='administrator'
                        value={administrator}
                        onChange={setAdministrator}
                    />
                    <InputField
                        inputStyle={inputStyle}
                        label='Специалист:'
                        id='specialist'
                        value={specialist}
                        onChange={setSpecialist}
                    />
                    <p style={inputStyle}>Выберите тип кузова</p>
                    <InputPicker
                        data={carTypesArray}
                        value={carTypeMap}
                        onChange={setCarTypeMap}

                        style={{
                            width: 500,
                            display: 'block',
                            marginBottom: 10,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 10,
                            WebkitTextFillColor: "#000000"
                        }}
                        menuStyle={{fontSize: "17px"}}
                    />
                    <p style={{
                        fontWeight: 'bold', display: 'flex',
                        fontSize: '17px', justifyContent: 'center', alignItems: 'center', marginTop: '15px'
                    }}>Выберите размер колёс</p>
                    <InputPicker
                        data={wheelSizeArray}
                        value={wheelR}
                        onChange={setWheelR}
                        style={{
                            width: 500,
                            display: 'block',
                            marginBottom: 10,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 10,
                            WebkitTextFillColor: "#000000"
                        }}
                        menuStyle={{fontSize: "17px"}}
                    />
                    <InputField
                        inputStyle={inputStyle}
                        label='Номер автомобиля:'
                        id='autoNumber'
                        value={autoNumber}
                        onChange={setAutoNumber}
                    />
                    <InputField
                        inputStyle={inputStyle}
                        label='Номер бокса:'
                        id='boxNumber'
                        value={boxNumber}
                        onChange={setBoxNumber}
                    />
                    <p style={inputStyle}>Время начала заказа</p>

                    <DatePicker
                        format="yyyy-MM-dd HH:mm"
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

                    <p style={inputStyle}>Время конца заказа</p>
                    <DatePicker
                        format="yyyy-MM-dd HH:mm"
                        oneTap
                        ranges={predefinedBottomRanges}
                        block
                        appearance="default"
                        value={endTime}
                        onChange={setEndTime}
                        style={{
                            width: 500,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 10,
                            WebkitTextFillColor: "#000000",
                        }}
                    />
                    <InputField
                        inputStyle={inputStyle}
                        label='Комментарии клиента:'
                        id='comments'
                        value={comments}
                        onChange={setComments}
                    />
                    <p style={inputStyle}>Был ли заказ выполнен</p>
                    <InputPicker
                        data={executedArray}
                        value={executed}
                        onChange={setExecuted}
                        style={{
                            width: 500,
                            display: 'block',
                            marginBottom: 10,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 10,
                            WebkitTextFillColor: "#000000"
                        }}
                        menuStyle={{fontSize: "17px"}}
                    />
                    <InputField
                        inputStyle={inputStyle}
                        label='Использованные клиентом бонусы:'
                        id='bonuses'
                        value={bonuses}
                        onChange={setBonuses}
                    />
                    <div className='submit-container'>
                        <Button className='btn-submit' variant='primary'
                                type='submit' style={{marginBottom: '20px', marginTop: '20px'}}>
                            Изменить информацию
                        </Button>
                    </div>
                </Form>
                {showConfirmation && (
                    <div className='confirmation-container'>
                        <div className='confirmation-message'>
                            <p style={inputStyle}>Вы уверены, что хотите удалить заказ?</p>
                            <p>Это изменит информацию об этом заказе ВО ВСЕЙ базе данных для ВСЕХ</p>
                            <p>Пожалуйста, предварительно спросите у клиента разрешение на удаление его заказа</p>
                            <div className='confirmation-buttons'>
                                <Button onClick={() => setShowConfirmation(false)}
                                        style={{marginRight: '10px', marginTop: '10px'}}>
                                    Отменить
                                </Button>
                                <Button variant='primary' style={{marginLeft: '10px', marginTop: '10px'}} type='submit'
                                        onClick={deleteOrder}>
                                    Подтвердить
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                <div className='submit-container'>
                    <Button
                        className='btn-delete'
                        variant='danger'
                        type='submit'
                        disabled={isSubmitting || Date.now() < submitTime + 4000}
                        onClick={deleteOrder}
                        style={{marginBottom: '20px', marginTop: '20px'}}
                    >
                        {isSubmitting ? 'Обработка запроса...' : 'Удалить заказ'}
                    </Button>
                </div>
            </>
        );
    }
;

export default UpdateOrderInfo;