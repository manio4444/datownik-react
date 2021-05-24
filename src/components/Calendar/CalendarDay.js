import React  from 'react';
import { Link } from 'react-router-dom';

import { RouterPaths } from "../../router/consts";
import Placeholder from "../Placeholder/Placeholder";

const CalendarDay = ({day, events, loading}) => {

    const offsetDay = !!day.offset;

    const CalendarDayContent = <>
        <span className={'calendar-table__day-number'}>{day.day}</span>
        {!loading && events.map(event => <p
            key={`${event.type}-${event.id}`}
            className={`calendar-table__day-event calendar-table__day-event--${event.type}`}
        >
            {event.txt}
        </p>)}
        {loading && <Placeholder/>}
        {loading && <Placeholder/>}
    </>;

    return offsetDay ? (
        <div className={`calendar-table__day calendar-table__day--offset`}>
            {CalendarDayContent}
        </div>
    ) : (
        <Link
            to={`/${RouterPaths.CALENDAR}/${day.iso}`}
            className={`calendar-table__day`}
        >
            {CalendarDayContent}
        </Link>
    )
};

export default CalendarDay;