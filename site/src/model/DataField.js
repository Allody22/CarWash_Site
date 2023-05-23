import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Form } from 'react-bootstrap';
import '../css/DataField.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DataField = ({ label, value, onChange,startText, endText }) => {
    const [datetime, setDatetime] = useState(moment(value));

    const handleDatetimeChange = (event) => {
        const { id, value } = event.target;
        const momentDatetime = moment(`${datetime.format('YYYY-MM-DD')}T${value}:00`);

        setDatetime(momentDatetime);
        onChange(momentDatetime.format());
    };

    return (
        <Form.Group>
            <Form.Row className="form-group-label">
                <div className="form-group-label">
                    <Form.Label htmlFor="date-picker" className="date-field">
                        <div className="form-group-label'">{startText}</div>
                    </Form.Label>
                    <DatePicker
                        selected={datetime.toDate()}
                        onChange={(date) => {
                            const momentDatetime = moment(date);
                            const updatedDatetime = momentDatetime.set({
                                hour: datetime.hours(),
                                minute: datetime.minutes()
                            });

                            setDatetime(updatedDatetime);
                            onChange(updatedDatetime.format());
                        }}
                        dateFormat="yyyy-MM-dd"
                        id="date-picker"
                    />
                </div>
                <div className="form-group-div">
                    <Form.Label
                        htmlFor="start-time"
                        className="form-group-label"
                    >
                        <div className="form-group-label">{endText}</div>
                    </Form.Label>
                    <Form.Control
                        type="time"
                        id="start-time"
                        defaultValue={datetime.format("HH:mm")}
                        onChange={handleDatetimeChange}
                        className="time-field"
                    />
                </div>
            </Form.Row>
        </Form.Group>
    );
};

export default DataField;