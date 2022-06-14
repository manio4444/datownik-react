import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { RouterPaths } from 'router/consts';
import Placeholder from 'components/Placeholder/Placeholder';
import { Button } from 'semantic-ui-react';
import ModalEventAdd from './ModalEventAdd';

const CalendarDay = ({ day, events, loading }) => {
  const offsetDay = !!day.offset;

  const [modalEventAdd, setModalEventAdd] = useState(false);

  const handleAddButton = (e) => {
    e.preventDefault();
    setModalEventAdd(true);
  };

  const CalendarDayContent = (
    <>
      <div className={'calendar-table__day-top'}>
        <span className={'calendar-table__day-number'}>{day.day}</span>
        <Button
          className={'calendar-table__day-add'}
          size={'mini'}
          onClick={handleAddButton}
        >
          +
        </Button>
      </div>
      {!loading &&
        events.map((event) => (
          <p
            key={`${event.type}-${event.id}`}
            className={`calendar-table__day-event calendar-table__day-event--${event.type}`}
          >
            {event.txt}
          </p>
        ))}
      {loading && <Placeholder />}
      {loading && <Placeholder />}
    </>
  );

  const ModalContent = modalEventAdd && (
    <ModalEventAdd
      value={''}
      dateTime={day.iso}
      trueCallback={() => setModalEventAdd(false)}
      falseCallback={() => setModalEventAdd(false)}
    />
  );

  return (
    <>
      {offsetDay ? (
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
      )}
      {ModalContent}
    </>
  );
};

export default CalendarDay;
