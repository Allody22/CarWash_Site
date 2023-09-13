import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {
    InputPicker,
    Notification, TagPicker, toaster, Uploader,
    useToaster,
} from 'rsuite';
import '../css/CreatingOrder.css';
import '../css/NewStyles.css';
import {Document, Page} from 'react-pdf';
import 'rsuite/dist/rsuite.css';

import {observer} from "mobx-react-lite";
import socketStore from "../store/SocketStore";
import {BrowserRouter as Router, Link, useHistory} from "react-router-dom";
import orderTypeMap from "../model/map/OrderTypeMapFromEnglish";
import {format, parseISO} from "date-fns";
import {getAllFiles} from "../http/userAPI";
import StatusFileMap from "../model/map/StatusFileMapFromEnd";

const smallInputStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
}
const inputStyle = {
    fontWeight: 'bold', display: 'flex',
    fontSize: '17px', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
}

const buttonStyle = {
    margin: '10px 0',
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%', // Это позволит кнопке занимать всю ширину родительского элемента
    fontSize: '16px', // Увеличьте размер текста на кнопке
    // дополнительные стили по вашему усмотрению...
};


const buttonDeleteStyle = {
    margin: '10px 0',
    padding: '10px 20px',
    backgroundColor: '#db344d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%', // Это позволит кнопке занимать всю ширину родительского элемента
    fontSize: '16px', // Увеличьте размер текста на кнопке
    // дополнительные стили по вашему усмотрению...
};


const statusStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '10px' // отступ от текста до изображения
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // Перенос элементов на следующую строку при нехватке места
    justifyContent: 'center', // Центрирование элементов внутри
    padding: '10px',
    margin: '10px auto'
};

const fileBoxStyle = {
    width: '700px', // Ширина окошка
    height: '750px',
    border: '1px solid black',
    padding: '10px',
    margin: '10px', // Отступы между окошками
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box'
};

const imageStyle = {
    maxWidth: '400px', // Ширина изображения
    height: 'auto',
    marginBottom: '10px'
};

// const imageStyle = {
//     maxWidth: '100%', // Ширина по размеру контейнера
//     height: 'auto', // Высота автоматически подстраивается
// };

const fileContainerStyle = {
    marginBottom: '20px',
    textAlign: 'center', // Выравнивание текста по центру
};

const serviceTypesArray = [
    'Шиномонтаж',
    'Мойка',
    'Полировка'
].map(item => ({label: item, value: item}));


const NewSalePage = observer(() => {
    const toaster = useToaster();

    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");


    const newOrderMessage = (
        <Router>
            <Notification
                type="info"
                header="Новый заказ!"
                closable
                timeout={null}
                style={{border: '1px solid black'}}
            >
                <div style={{width: 320}}>
                    {socketStore.message && (
                        <>
                            <div style={{textAlign: 'left'}}>
                                <p>Тип заказа: {orderTypeMap[JSON.parse(socketStore.message).orderType]}</p>
                                <p>Время начала
                                    заказа: {format(parseISO(JSON.parse(socketStore.message).startTime), 'dd.MM.yyyy HH:mm:ss')}</p>
                                <p>Время конца
                                    заказа: {format(parseISO(JSON.parse(socketStore.message).endTime), 'dd.MM.yyyy HH:mm:ss')}</p>
                            </div>
                        </>
                    )}
                </div>
            </Notification>
        </Router>
    );

    useEffect(() => {
        if (socketStore.message && !socketStore.isAlreadyShown) {
            toaster.push(newOrderMessage, {placement: "bottomEnd"});
            socketStore.isAlreadyShown = true;
        }
    }, [socketStore.message]);


    const [files, setFiles] = useState([]);

    useEffect(() => {
        async function getAllImages() {
            try {
                const response = await getAllFiles();
                setFiles(response);
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("Системная ошибка, попробуйте позже")
                }
            }
        }

        getAllImages();
    }, []);


    // <div style={{ width: '100%' }}> {/* Этот стиль гарантирует, что кнопки будут занимать всю ширину родительского контейнера */}
    //     <button style={buttonStyle} onClick={() => {
    //         // Ваша логика для первой кнопки
    //         console.log('Нажата первая кнопка для файла', file.id);
    //     }}>Обновить информацию об этой акции</button>
    //
    //     <button style={buttonDeleteStyle} onClick={() => {
    //         // Ваша логика для второй кнопки
    //         console.log('Обновить информацию об этой акции', file.id);
    //     }}>Удалить акцию</button>
    // </div>
    const handleFileChange = (event) => {
        // Здесь мы предполагаем, что файл всегда один, так как `multiple` отключено
        const currentFile = event.file;
        setFile(currentFile.blobFile); // blobFile содержит настоящий объект файла
    };

    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }


    return (
        <>
            <p style={{...inputStyle, marginTop: '15px'}}>Страница акций</p>
            <div style={containerStyle}>
                {files.map(file => {
                    const fileExtension = file.name.split('.').pop().toLowerCase();
                    return (
                        <div key={file.id} style={fileBoxStyle}>
                            <p style={statusStyle}>{StatusFileMap[file.status] || file.status}</p>
                            <p style={statusStyle}>Описание: {file.description || "Неизвестно"}</p>
                            <p style={statusStyle}>Версия этой акции: {file.version || "Неизвестно"}</p>
                            <p style={statusStyle}>Дата создания: {file.dateOfCreation ? new Date(file.dateOfCreation).toLocaleString() : "Неизвестно"}</p>

                            {fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' ? (
                                <img src={file.url} alt={file.description} style={imageStyle}/>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </>
    );

});

export default NewSalePage;