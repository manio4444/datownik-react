import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

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

    daysOfWeek = [
        'Poniedziałek',
        'Wtorek',
        'Środa',
        'Czwartek',
        'Piątek',
        'Sobota',
        'Niedziela',
    ];

    isLastWeekDay = day => Number(day.isoWeekday()) === 7;

    currentMonth = date => {
        const days = [];
        let dateDay = date.clone().startOf('month');

        while (dateDay.isSame(date, 'month')) {
            days.push({
                id: dateDay.format('YMD'),
                day: dateDay.format('D'),
            });
            dateDay.add(1, 'day');
        }
        return days;
    };

    previousMonthWeek = date => {
        const lastDay = date.endOf('month');
        const lastWeekday = Number(lastDay.isoWeekday());

        if (this.isLastWeekDay(lastDay)) return [];

        const prevMonthDays = [];
        let day = lastDay.clone().subtract(lastWeekday - 1, 'days');

        while (day.isSame(date, 'month')) {
            prevMonthDays.push({
                id: day.format('YMD'),
                day: day.format('D'),
            });
            day.add(1, 'day');
        }

        return prevMonthDays;
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

    render () {
        const {date} = this.props;
        const previousMonth = date.clone().subtract(1, 'months');

        const calendarDays = [
            ...this.previousMonthWeek(previousMonth),
            ...this.currentMonth(date),
            // ...this.nextMonthWeek(nextMonth),
        ];
        const calendarRows = this.daysIntoRows(calendarDays);

        return (
            <React.Fragment>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            {this.daysOfWeek.map(name => <Table.HeaderCell key={name}>
                                {name}
                            </Table.HeaderCell>)}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {calendarRows.map((row, i) => <Table.Row key={i}>
                            {row.map(day => <Table.Cell key={day.id}>
                                {day.day}
                            </Table.Cell>)}
                        </Table.Row>)}
                    </Table.Body>
                </Table>

            </React.Fragment>
        );
    }
}

export default CalendarTable;