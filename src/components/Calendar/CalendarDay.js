import React  from 'react';

import Placeholder from "../Placeholder/Placeholder";

const CalendarDay = ({day, events, loading}) => <div
    className={`calendar-table__day ${day.offset ? 'calendar-table__day--offset' : ''}`}
>
    <span className={'calendar-table__day-number'}>{day.day}</span>
    {!loading && events.map(event => <p
        key={`${event.type}-${event.id}`}
        className={`calendar-table__day-event calendar-table__day-event--${event.type}`}
    >
        {event.txt}
    </p>)}
    {loading && <Placeholder />}
    {loading && <Placeholder />}
</div>;

export default CalendarDay;