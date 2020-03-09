import React, { Component } from 'react';
import moment from "moment";

const DayOfMonth = ({day}) => {
    return <div
        style={{
            width: 'calc(100% / 7)',
            border: '1px solid lightgray'
        }}
        className="calendar__days"
    >{day}</div>
};

class CalendarTable extends Component {

    daysOfMonth = date => {
        const days = [];
        const daysInMonth = Number(date.daysInMonth());
        let dateDay = Number(date.startOf('month').format('D'));

        while (dateDay <= daysInMonth) {
            days.push(dateDay);
            dateDay++;
        }
        return days
    };

    daysOfPreviousMonth = date => {
        const prevDate = date.subtract(1, 'months'); //temp
        const daysInPrevMonth = Number(date.daysInMonth());
        const endOfPrevMonth = prevDate.endOf('month');
        const endWeekdayOfPrevMonth = Number(endOfPrevMonth.isoWeekday());
        const prevMonthDays = [];
        let dateDay = daysInPrevMonth - endWeekdayOfPrevMonth + 1;

        if (endWeekdayOfPrevMonth === 7) return [];

        while (dateDay <= daysInPrevMonth) {
            prevMonthDays.push(dateDay);
            dateDay++;
        }
        console.log(prevMonthDays);
        return prevMonthDays
    };

    render () {
        const daysToShow = [
            ...this.daysOfPreviousMonth(moment()),
            ...this.daysOfMonth(moment()),
            // ...this.daysOfNextMonth(moment()),
        ];

        return (
            <React.Fragment>
                <br/>
                <div style={{display: 'flex', 'flex-wrap': 'wrap'}}>
                    {daysToShow.map(day => <DayOfMonth day={day} />)}
                </div>

            </React.Fragment>
        );
    }
}


const PageCalendar = () => {
    return (
        <React.Fragment>
            <section className="calendar">

                <CalendarTable />

            </section>
        </React.Fragment>
    );
};

export default PageCalendar;
