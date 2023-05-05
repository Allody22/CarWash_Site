import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {useLocation, useHistory} from "react-router-dom";
import {ADMIN_ROUTE} from "../utils/consts";
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    useLocation();
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginClick = async () => {
        try {
            const data = await login(email, password);
            user.setUser(data)
            user.setIsAuth(true)
            history.push(ADMIN_ROUTE)
        } catch (error) {
            alert('Произошла ошибка. Пожалуйста, повторите попытку позже.');
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш телефон..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button
                            variant={"outline-success"}
                            onClick={loginClick}
                        >
                            Войти
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;