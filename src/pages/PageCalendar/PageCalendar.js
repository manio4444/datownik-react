import React, { useState } from 'react';
import moment from "moment";
import { Grid, Button } from "semantic-ui-react";
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

    const month = monthsOfYear[date.format('M') - 1];
    const year = date.format('YYYY');

    const handleSetDate = type => {
        if (type === 'subtract') setDate(date.clone().subtract(1, 'month'));
        if (type === 'add') setDate(date.clone().add(1, 'month'));
    };

    return (
        <React.Fragment>
            <section className="calendar">

                <h1>{month} {year}</h1>

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

                <CalendarTable date={date}/>

            </section>
        </React.Fragment>
    );
};

export default PageCalendar;
