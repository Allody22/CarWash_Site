import '../css/CreatingOrder.css';
import {updateUserInfo} from "../http/userAPI";
import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import '../css/CreatingOrder.css';
import InputField from "../model/InputField";
import {TagPicker} from "rsuite";


const rolesArray = [
    'Обычный пользователь',
    'Администратор',
    'Модератор',
].map(item => ({label: item, value: item}));

const inputStyle = {
    fontWeight: 'bold', display: 'flex',
    fontSize: '17px', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
}

const smallInputStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
}

const ChangeUserInfo = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [enSelectedRoles, setEnSelectedRoles] = useState([]);


    useEffect(() => {
        changeRolesToEnglish()
    }, [selectedRoles]);
    const changeRolesToEnglish = () => {
        const arrayOfRoles = []
        selectedRoles.forEach(item => arrayOfRoles.push(rolesToEnglishMap(item)));
        setEnSelectedRoles(arrayOfRoles);
    };


    const rolesToEnglishMap = (item) => {
        if (item === 'Модератор') {
            return 'ROLE_MODERATOR';
        } else if (item === 'Админ') {
            return 'ROLE_ADMIN';
        } else if (item === 'Администратор') {
            return 'ROLE_ADMINISTRATOR'
        } else if (item === 'Обычный пользователь') {
            return 'ROLE_USER';
        } else {
            return 'ERROR'
        }
    };

    const handleTagRemoved = (item) => {
        setSelectedRoles(prevSelectedRoles =>
            prevSelectedRoles.filter(role => role !== item)
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (showConfirmation) {
            try {
                const data = await updateUserInfo(email, username, fullName, enSelectedRoles);
                console.log(data)
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    console.log(error)
                    alert("Системная ошибка, попробуйте позже")
                }
            }
            setShowConfirmation(false);
        } else {
            setShowConfirmation(true);
        }
    }


    return (
        <>
            <p style={{...inputStyle,marginTop:'15px'}}>Страница изменения информации о человеке в базе данных</p>

            <p style={{...inputStyle, marginTop: '15px'}}>Выберите роли пользователя</p>
            <p style={smallInputStyle}>От этого зависит, смогут ли они пользоваться приложением и сайтом</p>
            <TagPicker data={rolesArray}
                       block
                       onChange={value => setSelectedRoles(value)}
                       onClose={handleTagRemoved}
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

            <Form onSubmit={handleSubmit}>
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
                {showConfirmation && (
                    <div className='confirmation-container'>
                        <div className='confirmation-message'>
                            <p style={inputStyle}>Вы уверены, что хотите отправить запрос?</p>
                            <p>Это изменит информацию об этом человеке ВО ВСЕЙ базе данных для ВСЕХ</p>
                            <div className='confirmation-buttons'>
                                <Button onClick={() => setShowConfirmation(false)}
                                        style={{marginRight: '10px', marginTop: '10px'}}>
                                    Отменить
                                </Button>
                                <Button variant='primary' style={{marginLeft: '10px', marginTop: '10px'}} type='submit'
                                        onSubmit={handleSubmit}>
                                    Подтвердить
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <div className='submit-container'>
                    <Button
                        className='btn-submit'
                        variant='primary'
                        type='submit'
                        style={{marginBottom: '20px', marginTop: '20px'}}
                    >
                        Обновить информацию
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default ChangeUserInfo;