import React from 'react';
import {Button,Container} from "react-bootstrap";
import {CREATE_ORDER_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";
//import '../css/App.css';

const Admin = () => {
    const history = useHistory()

    const createOrderPage = async () => {
        try {
            history.push(CREATE_ORDER_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-success"}
                onClick={() => history.push(CREATE_ORDER_ROUTE)}
            >
                Страница добавления заказа
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => history.push(CREATE_ORDER_ROUTE)}
            >
                Изменить информацию о человеке
            </Button>
        </Container>
    );
};

export default Admin;
