import React, { useState, useEffect } from 'react';
import moment from "moment";
import { Grid, Button, Icon } from "semantic-ui-react";

import { getMonthEvents } from "../../components/Calendar/actions"; //TODO - move to component inside /components/Calendar/
import CalendarTable from "../../components/Calendar/CalendarTable";
import { LANG_ARR_MONTHS } from '../../components/Calendar/const';
import ModalEventAdd from "../../components/Calendar/ModalEventAdd";

import 'semantic-ui-css/components/grid.min.css';

const PageCalendar = () => {
    const [date, setDate] = useState(moment());
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [monthEvents, setMonthEvents] = useState([]);
    const [modalEventAdd, setModalEventAdd] = useState(false);

    const month = Number(date.format('M'));
    const monthTitle = LANG_ARR_MONTHS[month - 1];
    const year = Number(date.format('YYYY'));

    useEffect(() => {
        setLoadingEvents(true);
        getMonthEvents({month, year})
            .then(data => {
                setMonthEvents(data.data.result);
            })
            .finally(() => setLoadingEvents(false));
    }, [date, modalEventAdd]);

    const handleSetDate = type => {
        if (type === 'subtract') setDate(date.clone().subtract(1, 'month'));
        if (type === 'add') setDate(date.clone().add(1, 'month'));
    };

    return (
        <React.Fragment>
            <section className="calendar">

                <h1>{monthTitle} {year}</h1>

                <Grid columns={3}>
                    <Grid.Column>
                        <Button
                            onClick={() => handleSetDate('subtract')}
                        >
                            {'<'}
                        </Button>
                    </Grid.Column>

                    <Grid.Column textAlign={'center'}>
                        <Button
                            icon
                            labelPosition='left'
                            onClick={() => setModalEventAdd(true)}
                        >
                            <Icon name='plus'/>
                            Dodaj
                        </Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Button
                            onClick={() => handleSetDate('add')}
                            floated={'right'}
                        >
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

            {modalEventAdd && <ModalEventAdd
                value={''}
                trueCallback={() => setModalEventAdd(false)}
                falseCallback={() => setModalEventAdd(false)}
            />}

        </React.Fragment>
    );
};

export default PageCalendar;
