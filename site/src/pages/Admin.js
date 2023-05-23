import React from 'react';
import {Button, Container} from "react-bootstrap";
import {
    CHANGE_USERINFO_ROUTE,
    CREATE_POLISHING_ORDER_ROUTE, CREATE_TIRE_ORDER_ROUTE,
    CREATE_WASHING_ORDER_ROUTE, ORDERS_TABLE_ROUTE, UPDATE_ORDER_INFO_ROUTE
} from "../utils/consts";
import {useHistory} from "react-router-dom";
//import '../css/App.css';

const Admin = () => {
    const history = useHistory()

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => history.push(ORDERS_TABLE_ROUTE)}
                style={{marginTop: '10px'}}
            >
                Таблица заказов по дням
            </Button>

            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => history.push(CREATE_WASHING_ORDER_ROUTE)}
                style={{marginTop: '10px'}}
            >
                Добавление заказа на мойку
            </Button>

            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => history.push(CREATE_POLISHING_ORDER_ROUTE)}
                style={{marginTop: '10px'}}
            >
                Добавление заказа на полировку
            </Button>

            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => history.push(CREATE_TIRE_ORDER_ROUTE)}
                style={{marginTop: '10px'}}
            >
                Добавление заказа на шиномонтаж
            </Button>

            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => history.push(CHANGE_USERINFO_ROUTE)}
                style={{marginTop: '10px'}}
            >
                Изменить информацию о человеке
            </Button>

            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => history.push(UPDATE_ORDER_INFO_ROUTE)}
                style={{marginTop: '10px'}}
            >
                Изменить информацию о заказе
            </Button>
        </Container>
    );
};

export default Admin;
