import React  from 'react';

const CalendarDay = ({day}) => <div
    className={`calendar-table__day ${day.offset ? 'calendar-table__day--offset' : ''}`}
>
    {day.day}
</div>;

export default CalendarDay;