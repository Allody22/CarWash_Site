import React, {useState} from 'react';
import '../css/MyTable.css';
import '../css/DatePicker.css';
import {useTable} from 'react-table';
import {parseISO, format} from 'date-fns';
import {getTableOrders} from "../http/orderAPI";
import orderTypeMap from "../model/OrderTypeMap";


const columns = [
    {
        Header: 'Айди',
        accessor: 'id',
    },
    {
        Header: 'Дата и время начала',
        accessor: 'startTime',
        Cell: ({value}) => value ? format(parseISO(value), 'dd.MM.yyyy HH:mm:ss') : 'Неизвестно'
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
    {Header: 'Администратор', accessor: 'administrator'},
    {Header: 'Специалист', accessor: 'specialist'},
    {Header: 'Бокс', accessor: 'boxNumber'},
    {Header: 'Бонусы', accessor: 'bonuses'},
    {Header: 'Комментарии клиента', accessor: 'comments'},
    {Header: 'Цена', accessor: 'price'}
];

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const start = new Date(selectedDate);
    const end = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await getTableOrders(start.toISOString(), end.toISOString());
            setOrders(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
        columns,
        data: orders,
    });

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="selected-date" className="btn-date">Выбранная дата:</label>
                    <div className="btn-date">
                        <input
                            type="date"
                            id="selected-date"
                            value={selectedDate.toISOString().substr(0, 10)}
                            onChange={(event) => setSelectedDate(new Date(event.target.value))}
                        />
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={loading} className="btn-find">
                        {loading ? 'Loading...' : 'Поиск в этот день'}
                    </button>
                </div>
            </form>
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