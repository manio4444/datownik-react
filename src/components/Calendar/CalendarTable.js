import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

const daysOfWeek = [
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela',
];

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

    render () {
        const {date} = this.props;
        const previousMonth = date.clone().subtract(1, 'months');
        const nextMonth = date.clone().add(1, 'months');

        const calendarDays = [
            ...this.previousMonthWeek(previousMonth),
            ...this.currentMonth(date),
            ...this.nextMonthWeek(nextMonth),
        ];
        const calendarRows = this.daysIntoRows(calendarDays);

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {daysOfWeek.map(name => <Table.HeaderCell key={name}>
                            {name}
                        </Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {calendarRows.map((row, i) => <Table.Row key={i}>
                        {row.map(day => <Table.Cell key={day.iso}>
                            {day.day}
                        </Table.Cell>)}
                    </Table.Row>)}
                </Table.Body>
            </Table>
        );
    }
}

export default CalendarTable;