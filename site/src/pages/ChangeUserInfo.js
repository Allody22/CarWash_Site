import '../css/CreatingOrder.css';
import {updateUserInfo} from "../http/userAPI";
import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import '../css/CreatingOrder.css';
import InputField from "../model/InputField";
import {TagPicker} from "rsuite";
import {logDOM} from "@testing-library/react";


const rolesArray = [
    'Обычный пользователь',
    'Администратор',
    'Модератор',
].map(item => ({label: item, value: item}));

const inputStyle = {
    fontWeight: 'bold', display: 'flex',
    fontSize: '17px', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
}

const ChangeUserInfo = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitTime, setSubmitTime] = useState(0);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [enSelectedRoles, setEnSelectedRoles] = useState([]);


    const sendUpdateRequest = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        setSubmitTime(Date.now());
        try {
            const data = await updateUserInfo(email, username, fullName, enSelectedRoles);
            alert(data);
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

    useEffect(() => {
        changeRolesToEnglish()
        console.log(selectedRoles)
    }, [selectedRoles]);
    const changeRolesToEnglish = () => {
        setEnSelectedRoles([]);
        for (const item in selectedRoles) {
            let roleName = '';
            if (item === 'Модератор') {
                roleName = 'ROLE_MODERATOR';
            } else if (item === 'Админ') {
                roleName = 'ROLE_ADMIN';
            } else if (item === 'Администратор') {
                roleName = 'ROLE_ADMINISTRATOR'
            } else if (item === 'Обычный пользователь') {
                roleName = 'ROLE_USER';
            } else {
                roleName = 'ERROR'
            }
            setEnSelectedRoles(...enSelectedRoles,roleName);
        }
        // console.log(enSelectedRoles)
    };


    // const changeRolesToEnglish = (item) => {
    //     let roleName = '';
    //     if (item === 'Модератор') {
    //         roleName = 'ROLE_MODERATOR';
    //     } else if (item === 'Админ') {
    //         roleName = 'ROLE_ADMIN';
    //     } else if (item === 'Администратор') {
    //         roleName = 'ROLE_ADMINISTRATOR'
    //     } else if (item === 'Клиент') {
    //         roleName = 'ROLE_USER';
    //     } else {
    //         roleName = 'ERROR'
    //     }
    //     setEnSelectedRoles(...enSelectedRoles,roleName)
    //     console.log(enSelectedRoles)
    // };

    const handleSelect = (value, item, event) => {
        const index = selectedRoles.indexOf(item);
        if (index === -1) {
            setSelectedRoles([...selectedRoles, item]);
        } else {
            const updatedRoles = selectedRoles.filter((r) => r !== item);
            setSelectedRoles(() => updatedRoles);
        }
    };


    return (
        <>
            <p style={{...inputStyle, marginTop: '15px'}}>Выберите роли пользователя</p>
            <p style={inputStyle}>От этого зависит, смогут ли они пользоваться приложением и сайтом</p>
            <TagPicker data={rolesArray}
                       block
                       onSelect={handleSelect}
                       style={{
                           width: '500px',
                           display: 'block',
                           marginBottom: 10,
                           marginLeft: 'auto',
                           marginRight: 'auto',
                           marginTop: 10,
                           WebkitTextFillColor: "#000000"
                       }}
            />

            <Form onSubmit={sendUpdateRequest}>
                <InputField
                    inputStyle={inputStyle}
                    label='Номер телефона'
                    id='username'
                    value={username}
                    onChange={setUsername}
                />
                <InputField
                    inputStyle={inputStyle}
                    label='Имя и фамилия'
                    id='fullName'
                    value={fullName}
                    onChange={setFullName}
                />
                <InputField
                    inputStyle={inputStyle}
                    label='Почта'
                    id='email'
                    value={email}
                    onChange={setEmail}
                />
                <div className='submit-container'>
                    <Button
                        className='btn-submit'
                        variant='primary'
                        type='submit'
                        disabled={isSubmitting || Date.now() < submitTime + 4000}
                        style={{marginBottom: '20px', marginTop: '20px'}}>
                        {isSubmitting ? 'Обработка запроса...' : 'Обновить информацию о пользователе'}
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default ChangeUserInfo;