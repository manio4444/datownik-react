import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Grid, Button, Icon, Dropdown } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import { getMonthEvents } from 'components/Calendar/actions'; //TODO - move to component inside /components/Calendar/
import CalendarTable from 'components/Calendar/CalendarTable';
import { LANG_ARR_MONTHS } from 'components/Calendar/const';
import ModalEventAdd from 'components/Calendar/ModalEventAdd';
import { RouterPaths } from 'router/consts';

import 'semantic-ui-css/components/grid.min.css';

const PageCalendar = () => {
  const [date, setDate] = useState(moment());
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [monthEvents, setMonthEvents] = useState([]);
  const [modalEventAdd, setModalEventAdd] = useState(false);
  const navigate = useNavigate();

  const month = Number(date.format('M'));
  const monthTitle = LANG_ARR_MONTHS[month - 1];
  const year = Number(date.format('YYYY'));

  const moreOptions = [
    {
      key: 'birthdays',
      text: 'Zobacz wydarzenia cykliczne',
      icon: 'birthday cake',
      action: () => {
        navigate(`/${RouterPaths.CALENDAR_BIRTHDAYS}`);
      },
    },
  ];

  useEffect(() => {
    fetchMonthEvents();
  }, [date]);

  const fetchMonthEvents = () => {
    setLoadingEvents(true);
    getMonthEvents({ month, year })
      .then((data) => {
        setMonthEvents(data.data.result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingEvents(false));
  };

  const handleSetDate = (type) => {
    if (type === 'subtract') setDate(date.clone().subtract(1, 'month'));
    if (type === 'add') setDate(date.clone().add(1, 'month'));
  };

  const handleMoreOption = (e, { action }) => {
    action && action();
  };

  return (
    <React.Fragment>
      <section className="calendar">
        <h1>
          {monthTitle} {year}
        </h1>

        <Grid columns={3}>
          <Grid.Column>
            <Button onClick={() => handleSetDate('subtract')}>{'<'}</Button>
          </Grid.Column>

          <Grid.Column textAlign={'center'}>
            <Button
              icon
              labelPosition="left"
              onClick={() => setModalEventAdd(true)}
            >
              <Icon name="plus" />
              Dodaj
            </Button>

            <Dropdown
              button
              icon={<></>}
              trigger={
                <Icon name="ellipsis vertical" style={{ marginRight: 0 }} />
              }
              selectedLabel={undefined}
            >
              <Dropdown.Menu>
                {moreOptions.map((option, i) => {
                  return (
                    <Dropdown.Item
                      key={i}
                      text={option.text}
                      icon={option.icon}
                      action={option.action}
                      onClick={handleMoreOption}
                    />
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>

          <Grid.Column>
            <Button onClick={() => handleSetDate('add')} floated={'right'}>
              {'>'}
            </Button>
          </Grid.Column>
        </Grid>

        <CalendarTable
          date={date}
          loading={loadingEvents}
          events={monthEvents}
        />
      </section>

      {modalEventAdd && (
        <ModalEventAdd
          value={''}
          trueCallback={() => {
            setModalEventAdd(false);
            fetchMonthEvents();
          }}
          falseCallback={() => setModalEventAdd(false)}
        />
      )}
    </React.Fragment>
  );
};

export default PageCalendar;
