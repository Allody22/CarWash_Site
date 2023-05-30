import React, {useState} from 'react';
import '../css/MyTable.css';
import '../css/DatePicker.css';
import {useTable} from 'react-table';
import {parseISO, format} from 'date-fns';
import {getTableOrders} from "../http/orderAPI";
import orderTypeMap from "../model/OrderTypeMap";
import {useHistory} from "react-router-dom";
import {DatePicker, Divider} from "rsuite";
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
        Header: 'Взятые услуги',
        accessor: 'orders',
        Cell: ({value}) => {
            return value.join(', ');
        }
    },
    {Header: 'Номер авто', accessor: 'autoNumber'},
    {Header: 'Тип кузова', accessor: 'autoType'},
    {Header: 'Размер шин', accessor: 'wheelR',
        Cell: ({value}) => value ? orderTypeMap[value] || value : "Неизвестно"
    },
    { Header: 'Был ли сделан заказ', accessor: 'executed',
        Cell: ({ value }) => (value ? 'Да' : 'Нет'),
    },
    {Header: 'Администратор', accessor: 'administrator'},
    {Header: 'Специалист', accessor: 'specialist'},
    {Header: 'Бокс', accessor: 'boxNumber'},
    {Header: 'Бонусы', accessor: 'bonuses'},
    {Header: 'Комментарии клиента', accessor: 'comments'},
    {Header: 'Цена', accessor: 'price'}
];

const OrderTable = () => {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);


    const [orders, setOrders] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const start = new Date(selectedDate);
    const end = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await getTableOrders(start.toISOString(), end.toISOString());
            setOrders(response);
        }catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("Системная ошибка, попробуйте позже")
            }
        } finally {
            setIsSubmitting(false)
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

            <p style={inputStyle}>Вы можете нажать на цифру айди, чтобы перейти на страницу изменения этого заказа</p>
            <Divider></Divider>

            <table {...getTableProps()} className="MyTable">
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