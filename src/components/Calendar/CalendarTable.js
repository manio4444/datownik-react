import React, { Component } from 'react';
import CalendarDay from './CalendarDay';
import './CalendarTable.scss';

const daysOfWeek = [
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela',
];

export class Table extends Component {
    static HeaderRow = ({children}) => <div className="calendar-table__header-row">{children}</div>;
    static HeaderCell = ({children}) => <div className="calendar-table__header-cell">{children}</div>;
    static Row = ({children}) => <div className="calendar-table__row">{children}</div>;
    static Cell = ({children}) => <div className="calendar-table__cell">{children}</div>;

    render() {
        return <div className={'calendar-table'}>{this.props.children}</div>
    }
}

class CalendarTable extends Component {

    isLastWeekDay = day => Number(day.isoWeekday()) === 7;

    isFirstWeekDay = day => Number(day.isoWeekday()) === 1;

    currentMonth = date => {
        const days = [];
        let day = date.clone().startOf('month');

        while (day.isSame(date, 'month')) {
            days.push({
                iso: day.format(),
                day: day.format('D'),
            });
            day.add(1, 'day');
        }
        return days;
    };

    previousMonthWeek = date => {
        let day = date.endOf('month');
        const prevMonthDays = [];

        while (!this.isLastWeekDay(day)) {
            prevMonthDays.unshift({
                iso: day.format(),
                day: day.format('D'),
                offset: true,
            });
            day.subtract(1, 'day');
        }

        return prevMonthDays;
    };

    nextMonthWeek = date => {
        let day = date.startOf('month');
        const nextMonthDays = [];

        while (!this.isFirstWeekDay(day)) {
            nextMonthDays.push({
                iso: day.format(),
                day: day.format('D'),
                offset: true,
            });
            day.add(1, 'day');
        }

        return nextMonthDays;
    };

    daysIntoRows = days => {
        const rows = [];
        let row = 1;

        days.forEach((day, i) => {
            if (!rows[row]) rows[row] = [];

            rows[row].push(day);

            if ((i + 1) % 7 === 0) row++;
        });

        return rows;
    };

    dayEvents = (events, day) => events.filter(event => event.day === day.day && !day.offset);

    render () {
        const {props} = this;
        const previousMonth = props.date.clone().subtract(1, 'months');
        const nextMonth = props.date.clone().add(1, 'months');

        const calendarDays = [
            ...this.previousMonthWeek(previousMonth),
            ...this.currentMonth(props.date),
            ...this.nextMonthWeek(nextMonth),
        ];
        const calendarRows = this.daysIntoRows(calendarDays);

        return (
            <Table>
                <Table.HeaderRow>
                    {daysOfWeek.map(name => <Table.HeaderCell key={name}>
                        {name}
                    </Table.HeaderCell>)}
                </Table.HeaderRow>

                {calendarRows.map((row, i) => <Table.Row key={i}>
                    {row.map(day => <Table.Cell
                        key={day.iso}
                    >
                        <CalendarDay
                            day={day}
                            events={this.dayEvents(props.events, day)}
                            loading={props.loading}

                        />
                    </Table.Cell>)}
                </Table.Row>)}
            </Table>
        );
    }
}

export default CalendarTable;