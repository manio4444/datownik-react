import React  from 'react';
import { useNavigate, useParams } from "react-router";

import CalendarDay from './CalendarDay';
import ModalDayView from "./ModalDayView";

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

const Table = ({children}) => <div className="calendar-table">{children}</div>;
const TableHeaderRow = ({children}) => <div className="calendar-table__header-row">{children}</div>;
const TableHeaderCell = ({children}) => <div className="calendar-table__header-cell">{children}</div>;
const TableRow = ({children}) => <div className="calendar-table__row">{children}</div>;
const TableCell = ({children}) => <div className="calendar-table__cell">{children}</div>;

const CalendarTable = (props) => {
  let routerParams = useParams();
  const navigate = useNavigate();

  const isLastWeekDay = day => Number(day.isoWeekday()) === 7;

  const isFirstWeekDay = day => Number(day.isoWeekday()) === 1;

  const currentMonth = date => {
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

  const previousMonthWeek = date => {
    let day = date.endOf('month');
    const prevMonthDays = [];

    while (!isLastWeekDay(day)) {
      prevMonthDays.unshift({
        iso: day.format(),
        day: day.format('D'),
        offset: true,
      });
      day.subtract(1, 'day');
    }

    return prevMonthDays;
  };

  const nextMonthWeek = date => {
    let day = date.startOf('month');
    const nextMonthDays = [];

    while (!isFirstWeekDay(day)) {
      nextMonthDays.push({
        iso: day.format(),
        day: day.format('D'),
        offset: true,
      });
      day.add(1, 'day');
    }

    return nextMonthDays;
  };

  const daysIntoRows = days => {
    const rows = [];
    let row = 1;

    days.forEach((day, i) => {
      if (!rows[row]) rows[row] = [];

      rows[row].push(day);

      if ((i + 1) % 7 === 0) row++;
    });

    return rows;
  };

  const getDayNumber = dateIso => new Date(dateIso).getDate();

  const dayEvents = day => props.events.filter(event => event.day === day.day.toString() && !day.offset);

  const closeModal = () => navigate(-1); //TODO - there should be routing path generator - calendar without date param

  const previousMonth = props.date.clone().subtract(1, 'months');
  const nextMonth = props.date.clone().add(1, 'months');

  const calendarDays = [
    ...previousMonthWeek(previousMonth),
    ...currentMonth(props.date),
    ...nextMonthWeek(nextMonth),
  ];
  const calendarRows = daysIntoRows(calendarDays);

  const openModal = !!Date.parse(routerParams.date);

  return (
    <Table>
      <TableHeaderRow>
        {daysOfWeek.map(name => <TableHeaderCell key={name}>
          {name}
        </TableHeaderCell>)}
      </TableHeaderRow>

      {calendarRows.map((row, i) => <TableRow key={i}>
        {row.map(day => <TableCell
          key={day.iso}
        >
          <CalendarDay
            day={day}
            events={dayEvents(day)}
            loading={props.loading}
          />
        </TableCell>)}
      </TableRow>)}

      {openModal && <ModalDayView
        dateIso={routerParams.date}
        events={dayEvents({day: getDayNumber(routerParams.date)})}
        day={getDayNumber(routerParams.date)}
        loading={props.loading}
        falseCallback={closeModal}
      />}
    </Table>
  );
}

export default CalendarTable;