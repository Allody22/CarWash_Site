import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
    ADMIN_ROUTE,
    CHANGE_USERINFO_ROUTE,
    LOGIN_ROUTE, ORDERS_TABLE_ROUTE
} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {NavLink, useHistory} from 'react-router-dom'
import {signOut} from "../http/userAPI";

//Это мы короче видим на первом экране, надпись СлеваСверху слева сверху
const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = async () => {
        user.setUser({})
        user.setIsAuth(false)
        await signOut();
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={ADMIN_ROUTE}>Путь админа</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'orange'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>

                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(CHANGE_USERINFO_ROUTE)}
                        >
                            Изменение инфы о человеке
                        </Button>

                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ORDERS_TABLE_ROUTE)}
                        >
                            Таблица заказов
                        </Button>


                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>СправаСверху</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;