import React  from 'react';

const CalendarDay = ({day, events}) => <div
    className={`calendar-table__day ${day.offset ? 'calendar-table__day--offset' : ''}`}
>
    <span className={'calendar-table__day-number'}>{day.day}</span>
    {events.map(event => <p
        key={`${event.type}-${event.id}`}
        className={`calendar-table__day-event calendar-table__day-event--${event.type}`}
    >
        {event.txt}
    </p>)}
</div>;

export default CalendarDay;