import '../css/CreatingOrder.css';
import {updateUserInfo} from "../http/userAPI";
import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import '../css/CreatingOrder.css';
import Modal from "react-bootstrap/Modal";
import InputField from "../components/InputField";
import {ADMIN_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";

const ChangeUserInfo = () => {
    const history = useHistory()
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const allItems = [ 'Администратор', 'Админ'];
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [enSelectedRoles, senEnSelectedRoles] = useState([]);


    const sendUpdateRequest = async () => {
        try {
            const data = await updateUserInfo(email, username, fullName, enSelectedRoles);
            alert(data);
        } catch (error) {
            console.log(email, username, fullName, enSelectedRoles)
            console.log(error)
            alert(error);
        }
    };

    const handleClick = item => {
        let roleName = '';
        if (item === 'Модератор') {
            roleName = 'ROLE_MODERATOR';
        } else if (item === 'Админ') {
            roleName = 'ROLE_ADMIN';
        } else if (item === 'Администратор') {
            roleName = 'ROLE_ADMINISTRATOR'
        } else if (item === 'Клиент') {
            roleName = 'ROLE_USER';
        } else {
            roleName = 'ERROR'
        }
        if (selectedRoles.includes(item)) {
            setSelectedRoles(selectedRoles.filter(i => i !== item));
            senEnSelectedRoles(enSelectedRoles.filter(i => i !== roleName));
        } else {
            setSelectedRoles([...selectedRoles, item]);
            senEnSelectedRoles([...enSelectedRoles, roleName]);
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    return (
        <>
            <Button className='full-width' variant='secondary'
                    onClick={handleOpenModal}>
                Выберите роли пользователя
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} className='my-custom-class'>
                <Modal.Header closeButton>
                    <Modal.Title>Существующие роли</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {allItems.sort().map((item) => (
                        <div
                            key={item}
                            onClick={() => handleClick(item)}
                            className={'checkbox-custom ' + (selectedRoles.includes(item) ? 'checked' : '')}>
                            <div className='checkmark'></div>
                            <span className='text'>{item}</span>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            {selectedRoles.length > 0 && (
                <div className='selected-items'>
                    <Form.Label>Выбранные роли:</Form.Label>
                    <div className='selected-items'>
                        {selectedRoles.map((item) => (
                            <span key={item} className='item'>
          {item}
        </span>
                        ))}
                    </div>
                </div>
            )}
            <Form onSubmit={sendUpdateRequest}>
                <InputField
                    label='Номер телефона'
                    id='username'
                    value={username}
                    onChange={setUsername}
                />
                <InputField
                    label='Имя и фамилия:'
                    id='fullName'
                    value={fullName}
                    onChange={setFullName}
                />
                <InputField
                    label='Почта'
                    id='email'
                    value={email}
                    onChange={setEmail}
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

export default ChangeUserInfo;