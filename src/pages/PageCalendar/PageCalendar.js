import React, { useState, useEffect } from 'react';
import moment from "moment";
import { Grid, Button } from "semantic-ui-react";

import { getMonthEvents } from "../../components/Calendar/actions"; //TODO - move to component inside /components/Calendar/
import CalendarTable from "../../components/Calendar/CalendarTable";

import 'semantic-ui-css/components/grid.min.css'; // TODO - import this in specific component

const monthsOfYear = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
];

const PageCalendar = () => {
    const [date, setDate] = useState(moment());
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [monthEvents, setMonthEvents] = useState([]);

    const month = Number(date.format('M'));
    const monthTitle = monthsOfYear[month - 1];
    const year = Number(date.format('YYYY'));

    useEffect(() => {
        setLoadingEvents(true);
        getMonthEvents({month, year})
            .then(data => {
                setMonthEvents(data.data.result);
            })
            .finally(() => setLoadingEvents(false));
    }, [date]);

    const handleSetDate = type => {
        if (type === 'subtract') setDate(date.clone().subtract(1, 'month'));
        if (type === 'add') setDate(date.clone().add(1, 'month'));
    };

    return (
        <React.Fragment>
            <section className="calendar">

                <h1>{monthTitle} {year}</h1>

                <Grid>
                    <Grid.Column width={8}>
                        <Button
                            onClick={() => handleSetDate('subtract')}
                        >
                            Poprzedni
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Button
                            onClick={() => handleSetDate('add')}
                            floated={'right'}
                        >
                            Następny
                        </Button>
                    </Grid.Column>
                </Grid>

                <CalendarTable
                    date={date}
                    loading={loadingEvents}
                    events={monthEvents}
                />

            </section>
        </React.Fragment>
    );
};

export default PageCalendar;
