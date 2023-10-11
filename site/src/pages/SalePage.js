import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {Notification, useToaster,} from 'rsuite';
import '../css/CreatingOrder.css';
import '../css/NewStyles.css';
import '../css/CommonStyles.css';
import 'rsuite/dist/rsuite.css';

import {observer} from "mobx-react-lite";
import socketStore from "../store/SocketStore";
import {BrowserRouter as Router} from "react-router-dom";
import orderTypeMap from "../model/map/OrderTypeMapFromEnglish";
import {format, parseISO} from "date-fns";
import {getAllSales, uploadImage} from "../http/userAPI";
import StatusFileMap from "../model/map/StatusFileMapFromEnd";
import Modal from "react-bootstrap/Modal";
import InputField from "../model/InputField";
import StatusFileMapFromRus from "../model/map/StatusFileMapFromRus";
import saleStore from "../store/SaleStore";
import {saleDay} from "../model/Constants";

const inputFileStyle = {
    display: 'block',          // делает input блочным элементом
    margin: '10px auto',       // добавляет отступы сверху и снизу и выравнивает по центру
    width: '70%',             // устанавливает ширину элемента
    padding: '10px',          // добавляет внутренние отступы
    fontSize: '16px'          // увеличивает размер шрифта (и самого инпута)
};

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

const modalText = {
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '18px',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
};

const confirmationStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'green',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center', // заменено на camelCase
    alignItems: 'center',     // заменено на camelCase
    textAlign: 'center'      // заменено на camelCase
};


const statusStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '5px', // уменьшил отступ
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%'
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '5px', // уменьшил padding
    margin: '5px auto' // уменьшил margin
};

const fileBoxStyle = {
    maxWidth: '700px',
    width: '100%',  // использовать всю доступную ширину до максимума в 700px
    border: '1px solid black',
    padding: '5px', // уменьшил padding
    margin: '5px',  // уменьшил margin
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    overflow: 'hidden'
};

const imageStyle = {
    maxWidth: '100%', // изображение будет адаптивным по ширине контейнера
    maxHeight: '300px',
    height: 'auto',
    marginBottom: '5px' // уменьшил отступ
};


const SalePage = observer(() => {
    const toaster = useToaster();

    const [errorResponse, setErrorResponse] = useState();
    const [errorFlag, setErrorFlag] = useState(false);

    const [successResponse, setSuccessResponse] = useState();

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [uploadedFile, setUploadedFile] = useState(null);

    const [description, setDescription] = useState("");

    const [status, setStatus] = useState("");

    const [files, setFiles] = useState([]);

    async function getAllImages() {
        try {
            const response = await getAllSales();
            setFiles(response);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("Системная ошибка, попробуйте позже")
            }
        }
    }

    useEffect(() => {
        getAllImages();
    }, []);

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


    useEffect(() => {
        if (saleStore?.error) {
            const errorResponseMessage = (
                <Notification
                    type="error"
                    header="Ошибка!"
                    closable
                    style={{border: '1px solid black'}}
                >
                    <div style={{width: 320}}>
                        {saleStore.error}
                    </div>
                </Notification>
            );

            toaster.push(errorResponseMessage, {placement: "bottomEnd"});
            saleStore.error = null; // Очищаем ошибку после показа
        }
    }, [saleStore?.error]);


    useEffect(() => {
        if (saleStore.discounts.length === 0) {
            saleStore.loadDiscounts();
        } else {
            setFiles(saleStore.discounts);
        }
    }, [saleStore.discounts]);


    const handleRefreshDiscounts = () => {
        saleStore.refreshDiscounts();
    };


    const handleUpload = async () => {
        if (uploadedFile && description && status) {
            try {
                const response = await uploadImage(uploadedFile, description, StatusFileMapFromRus[status]);
                setSuccessResponse(response.message)
                setDescription("")
                setStatus("")
                setUploadedFile(null)

                handleRefreshDiscounts()
                await getAllImages();
            } catch (error) {
                if (error.response) {
                    let messages = [];
                    for (let key in error.response.data) {
                        messages.push(error.response.data[key]);
                    }
                    setErrorResponse(messages.join(''));
                    setErrorFlag(flag => !flag);

                } else {
                    setErrorResponse("Системная ошибка с загрузкой файлов. " +
                        "Перезагрузите страницу и попроуйте еще раз")
                    setErrorFlag(flag => !flag)
                }
            }
        }
    };

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

    const handleOpenModal = (file) => {
        if (file) {
            setDescription(file.description);
            setStatus(StatusFileMap[file.status])
        } else {
            setDescription("");
            setStatus("");
        }
        setShowModal(true);
    };


    const handleCloseModal = () => {
        setDescription("")
        setUploadedFile(null)
        setShowModal(false);
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleOpenConfirmationModal = () => {
        setShowConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    };


    return (
        <>
            <p className="input-style-modified">Страница акций</p>
            <p className="small-input-style">Если где-то появляется надпись "Неизвестно",
                то перезайдите на эту страницу.</p>
            <p className="small-input-style">Вы можете добавить акцию на какой-то определённый день недели
                или обновить текущую.</p>
            <p className="small-input-style"><strong>Пожалуйста</strong>, внимательно выбирайте картинки
                для отправки: очень большие картинки пользователям будет тяжело смотреть с телефона</p>
            <div style={containerStyle}>
                {files.map(file => {
                    const fileExtension = file.name.split('.').pop().toLowerCase();
                    return (
                        <div key={file.id} style={fileBoxStyle}>
                            <p style={statusStyle}>{StatusFileMap[file.status] || file.status}</p>
                            <p style={statusStyle}>Описание: {file.description || "Неизвестно"}.
                                Версия {(file.version + 1) || "Неизвестно"}</p>
                            <p style={statusStyle}>Дата
                                создания: {file.dateOfCreation ? new Date(file.dateOfCreation).toLocaleString() : "Неизвестно"}</p>

                            <p style={statusStyle}>
                                {file.url
                                    ? <a href={file.url} target="_blank" download>Ссылка для скачивания</a>
                                    : "Неизвестно"}
                            </p>

                            {fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' ? (
                                <img src={file.url} alt={file.description} style={imageStyle} loading="lazy"/>
                            ) : null}

                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                marginTop: '10px', marginBottom: '20px'
                            }}>
                                <Button
                                    variant={"outline-dark"}
                                    className="mt-4 p-2 flex-grow-1"
                                    onClick={() => handleOpenModal(file)}
                                    style={{marginTop: '10px'}}
                                >
                                    Обновить данную услугу
                                </Button>
                            </div>
                        </div>
                    );
                })}
                <Modal show={showModal}
                       onHide={handleCloseModal}
                       dialogClassName="custom-modal-dialog">
                    <Modal.Header closeButton>
                        <Modal.Title>Информация о новой версии файла</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{
                                width: 500,
                                display: 'block',
                                marginBottom: 10,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 10,
                                WebkitTextFillColor: "#000000"
                            }}
                        >
                            <option value="" disabled selected>ВЫБРАТЬ ДЕНЬ</option>
                            {saleDay.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>

                        <InputField
                            inputStyle={modalText}
                            label='Описание'
                            id='description'
                            value={description}
                            onChange={setDescription}
                        />

                        <input type="file" onChange={handleFileChange} style={inputFileStyle}/>
                        {uploadedFile ? <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded"
                                             style={{width: '100%', margin: '20px 0'}}/> : null}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleCloseModal}>
                            Закрыть
                        </Button>
                        <Button variant='primary' onClick={handleOpenConfirmationModal}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Подтверждение</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={confirmationStyle}>Проверьте еще раз информацию</p>
                        <p style={modalText}>{StatusFileMap[status] || status || "Неизвестно"}</p>
                        <p style={modalText}>Описание: {description || "Неизвестно"}</p>
                        {uploadedFile ? <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded"
                                             style={{width: '100%', margin: '20px 0'}}/> : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleCloseConfirmationModal}>
                            Отменить
                        </Button>
                        <Button variant='primary' onClick={() => {
                            handleUpload();
                            // Вызовите здесь вашу функцию подтверждения, если она у вас есть
                            handleCloseConfirmationModal();
                            handleCloseModal();
                        }}>
                            Да, я уверен
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>

            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: '10px', marginBottom: '20px'
            }}>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 flex-grow-1"
                    onClick={handleOpenModal}
                    style={buttonStyle}
                >
                    Добавить новую акцию на новый день недели
                </Button>
            </div>

        </>
    );
});

export default SalePage;