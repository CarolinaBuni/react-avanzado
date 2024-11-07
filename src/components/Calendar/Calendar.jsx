// Calendar.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './Calendar.css';
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ( { onDateSelect } ) => {
     const [ startDate, setStartDate ] = useState( new Date() );

     const handleDateChange = ( date ) => {
          setStartDate( date );
          onDateSelect( date ); // Llama a la función pasada desde `EventsMap`
     };
     return (
          <div className='calendar-container'>
               <DatePicker
                    selected={ startDate }
                    onChange={ handleDateChange } />
          </div>
     );
};

export default Calendar;