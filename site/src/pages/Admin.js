import React from 'react';
import {Button, Container} from "react-bootstrap";
import Image from 'react-bootstrap/Image';

import carWashImage from '../assets/carWashImage.png';
import tireServiceImage from "../assets/tireService.png"
import polishingImage from "../assets/polishingImage.png"
import dataBase from "../assets/dataBase.png"
import updateOrderInfo from "../assets/updateOrderInfo.png"
import updateClientInfo from "../assets/updatingClientInfo.png"
import updateServiceInfo from "../assets/updateServiceInfo.png"
import addNewService from "../assets/addService.png"




import {
    CHANGE_SERVICE_INFO,
    CHANGE_USERINFO_ROUTE, CREATE_NEW_SERVICE,
    CREATE_POLISHING_ORDER_ROUTE, CREATE_TIRE_ORDER_ROUTE,
    CREATE_WASHING_ORDER_ROUTE, ORDERS_TABLE_ROUTE, UPDATE_ORDER_INFO_ROUTE
} from "../utils/consts";
import {useHistory} from "react-router-dom";

const imageStyle = {width: '100px', height: '60px', marginLeft: '15px', marginTop: '20px'};
const verySmallImageStyle = {width: '85px', height: '60px', marginLeft: '30px', marginTop: '20px'}

const Admin = () => {
    const history = useHistory()

    return (
        <Container className="d-flex flex-column">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px'}}>
                <Button variant="outline-dark"
                        className="mt-4 p-2 flex-grow-1"
                        onClick={() => history.push(ORDERS_TABLE_ROUTE)}>
                    Таблица заказов по дням
                </Button>
                <Image src={dataBase} fluid
                       style={verySmallImageStyle}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px'}}>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 flex-grow-1"
                    onClick={() => history.push(CREATE_WASHING_ORDER_ROUTE)}
                    style={{marginTop: '10px'}}
                >
                    Добавление заказа на мойку
                </Button>
                <Image src={carWashImage} fluid style={imageStyle}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px'}}>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 flex-grow-1"
                    onClick={() => history.push(CREATE_POLISHING_ORDER_ROUTE)}
                    style={{marginTop: '10px'}}
                >
                    Добавление заказа на полировку
                </Button>
                <Image src={polishingImage} fluid
                       style={verySmallImageStyle}/>

            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px'}}>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 flex-grow-1"
                    onClick={() => history.push(CREATE_TIRE_ORDER_ROUTE)}
                    style={{marginTop: '10px'}}
                >
                    Добавление заказа на шиномонтаж
                </Button>
                <Image src={tireServiceImage} fluid style={imageStyle}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px'}}>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 flex-grow-1"
                    onClick={() => history.push(CHANGE_USERINFO_ROUTE)}
                    style={{marginTop: '10px'}}
                >
                    Изменить информацию о человеке
                </Button>
                <Image src={updateClientInfo} fluid style={verySmallImageStyle}/>

            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px'}}>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 flex-grow-1"
                    onClick={() => history.push(UPDATE_ORDER_INFO_ROUTE)}
                    style={{marginTop: '10px'}}
                >
                    Изменить информацию о заказе
                </Button>
                <Image src={updateOrderInfo} fluid style={verySmallImageStyle}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px'}}>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 flex-grow-1"
                    onClick={() => history.push(CHANGE_SERVICE_INFO)}
                    style={{marginTop: '10px'}}
                >
                    Изменить информацию об услуге
                </Button>
                <Image src={updateServiceInfo} fluid style={verySmallImageStyle}/>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: '10px', marginBottom:'20px'}}>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 flex-grow-1"
                    onClick={() => history.push(CREATE_NEW_SERVICE)}
                    style={{marginTop: '10px'}}
                >
                    Добавить новую услугу
                </Button>
                <Image src={addNewService} fluid style={verySmallImageStyle}/>
            </div>

        </Container>
    );
};

export default Admin;
