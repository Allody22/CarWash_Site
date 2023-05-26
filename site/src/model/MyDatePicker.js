import React, {useState} from 'react';
import 'rsuite/dist/rsuite.css';
import '../css/DatePicker.css';

import { DatePicker } from 'rsuite';

const MyDatePicker = () => {
    const [date, setDate] = useState(null);

    const handleChange = (value) => {
        setDate(value);
    };

    return (
        <div>
            <DatePicker value={date} onChange={handleChange} />
        </div>
    );
};

export default MyDatePicker;
