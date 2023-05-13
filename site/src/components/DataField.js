import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Form } from 'react-bootstrap';
import '../css/DataField.css';


const DataField = ({ label, id, value, onChange }) => {
    const [datetime, setDatetime] = useState(moment());

    const handleDatetimeChange = (event) => {
        const newDatetime = event.target.value;
        const momentDatetime = moment(newDatetime, 'YYYY-MM-DDTHH:mm:ss.SSSX').tz('Asia/Novosibirsk');

        setDatetime(momentDatetime);
        onChange(momentDatetime.format('YYYY-MM-DDTHH:mm:ss.SSSX'));
    };

    return (
        <Form.Group controlId={id}>
            <Form.Label className='form-group-label'>{label}</Form.Label>
            <Form.Row className='form-row-separated'>
                <div className='form-group-div'>
                    <Form.Label className='form-group-label'>{`Дата начала заказа`}</Form.Label>
                    <Form.Control type='date' defaultValue={datetime.format('YYYY-MM-DD')} onChange={handleDatetimeChange} className='date-field'/>
                </div>
                <div className='form-group-div'>
                    <Form.Label className='form-group-label'>{`Время начала заказа`}</Form.Label>
                    <Form.Control type='time' defaultValue={datetime.format('HH:mm')} onChange={handleDatetimeChange} className='time-field'/>
                </div>
            </Form.Row>
        </Form.Group>
    );
};

export default DataField;