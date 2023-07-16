import React, {useEffect, useState} from 'react';
import '../css/MyTable.css';
import '../css/DatePicker.css';
import {useTable} from 'react-table';
import {parseISO, format} from 'date-fns';
import {getNotMadeOrders, getTableOrdersInOneDay} from "../http/orderAPI";
import orderTypeMap from "../model/map/OrderTypeMapFromEnglish";
import {useHistory} from "react-router-dom";
import {DatePicker, Divider, Notification, useToaster} from "rsuite";
import addDays from "date-fns/addDays";
import {Button} from "react-bootstrap";

const inputStyle = {
    fontWeight: 'bold', display: 'flex',
    fontSize: '17px', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
}


const columns = [
    {
        Header: 'Айди',
        accessor: 'id',
        Cell: ({value}) => {
            const history = useHistory();
            return <div onClick={() => history.push(`/updateOrderInfo/${value}`)}>{value}</div>;
        }
    },
    {
        Header: 'Дата и время начала',
        accessor: 'startTime',
        Cell: ({value}) => value ? format(parseISO(value), 'dd.MM.yyyy HH:mm:ss') : `Неизвестно`
    },
    {
        Header: 'Дата и время конца',
        accessor: 'endTime',
        Cell: ({value}) => value ? format(parseISO(value), 'dd.MM.yyyy HH:mm:ss') : 'Неизвестно'
    },
    {
        Header: 'Тип заказа',
        accessor: 'orderType',
        Cell: ({value}) => value ? orderTypeMap[value] || value : "Неизвестно"
    },
    {
        Header: 'Клиент',
        accessor: 'userNumber', Cell: ({value}) => {
            return value === null ? 'Неизвестно' : value;
        }
    },
    {
        Header: 'Взятые услуги',
        accessor: 'orders',
        Cell: ({value}) => {
            return value.join(', ');
        }
    },
    {
        Header: 'Номер авто', accessor: 'autoNumber', Cell: ({value}) => {
            return value === null ? 'Неизвестно' : value;
        }
    },
    {
        Header: 'Тип кузова', accessor: 'autoType', Cell: ({value}) => {
            return value === null ? 'Неизвестно' : value;
        }
    },
    {
        Header: 'Был ли сделан заказ', accessor: 'executed',
        Cell: ({value}) => (value ? 'Да' : 'Нет'),
    },
    {
        Header: 'Администратор',
        accessor: 'administrator',
        Cell: ({value}) => {
            return value === null ? 'Неизвестно' : value;
        }
    },
    {
        Header: 'Специалист', accessor: 'specialist',
        Cell: ({value}) => {
            return value === null ? 'Неизвестно' : value;
        }
    },
    {
        Header: 'Бокс', accessor: 'boxNumber', Cell: ({value}) => {
            return value === null ? 'Неизвестно' : value;
        }
    },
    {
        Header: 'Комментарии клиента', accessor: 'comments',
        Cell: ({value}) => {
            return value === null ? 'Отсутствуют' : value;
        }
    },
    {Header: 'Цена', accessor: 'price'}
];

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingB, setIsSubmittingB] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const start = new Date(selectedDate);
    const end = new Date(selectedDate);

    const [errorResponse, setErrorResponse] = useState();
    const [errorFlag, setErrorFlag] = useState(false);
    const [successResponse, setSuccessResponse] = useState();
    const toaster = useToaster();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await getTableOrdersInOneDay(start.toISOString(), end.toISOString());
            setOrders(response);

            setSuccessResponse(null)
            setSuccessResponse("Yes all orders")
        } catch (error) {
            if (error.response) {
                setErrorResponse("Что-то пошло не так.\n" +
                    "Перезагрузите страницу и повторите попытку")
                setErrorFlag(flag => !flag)
            } else {
                setErrorResponse("Системная ошибка.\n" +
                    "Перезагрузите страницу и повторите попытку")
                setErrorFlag(flag => !flag)
            }
        } finally {
            setIsSubmitting(false)
        }
    };

    const successMessage = (
        <Notification
            type="success"
            header="Успешно!"
            closable
            style={{border: '1px solid black'}}
        >
            <div style={{width: 320}}>
                <p>Информация успешно получено из базы данных</p>
            </div>
        </Notification>
    );

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

    useEffect(() => {
        if (successResponse) {
            toaster.push(successMessage, {placement: "bottomEnd"});
        }
    }, [successResponse]);

    const handleNotMadeOrders = async (event) => {
        event.preventDefault();
        if (isSubmittingB) {
            return;
        }
        setIsSubmittingB(true);

        try {
            const response = await getNotMadeOrders();
            setOrders(response);
            setSuccessResponse(null)
            setSuccessResponse("Yes not made orders")
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("Системная ошибка, попробуйте позже")
            }
        } finally {
            setIsSubmittingB(false)
        }
    };

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
        columns,
        data: orders,
    });


    const predefinedBottomRanges = [
        {
            label: 'Позавчера',
            value: addDays(new Date(), -2),
        },
        {
            label: 'Вчера',
            value: addDays(new Date(), -1),
        },
        {
            label: 'Сегодня',
            value: new Date(),
        }
    ];

    return (
        <div>
            <p style={{
                fontWeight: 'bold', display: 'flex', fontSize: '17px', justifyContent: 'center',
                alignItems: 'center', marginTop: '15px'
            }}>Выберите день заказа</p>

            <DatePicker
                format="yyyy-MM-dd"
                oneTap
                ranges={predefinedBottomRanges}
                block
                appearance="default"
                value={selectedDate}
                onChange={setSelectedDate}
                style={{
                    width: 500,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 10,
                    WebkitTextFillColor: "#000000",
                }}
            />
            <Button
                className='btn-submit'
                variant='primary'
                type='submit'
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                style={{marginBottom: '20px', marginTop: '20px'}}>
                {isSubmitting ? 'Поиск заказов...' : 'Получить все заказы в этот день'}
            </Button>
            <Button
                className='btn-submit'
                variant='primary'
                type='submit'
                onClick={handleNotMadeOrders}
                disabled={isSubmittingB}
                style={{marginBottom: '20px', marginTop: '20px'}}>
                {isSubmittingB ? 'Поиск заказов...' : 'Получить все не сделанные заказы'}
            </Button>

            <p style={inputStyle}>Вы можете нажать на цифру айди, чтобы перейти на страницу изменения этого заказа</p>
            <Divider></Divider>

            <table {...getTableProps()} className="MyTable" style={{marginBottom:'100px'}}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;