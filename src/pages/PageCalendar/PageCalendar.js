import React from 'react';
import moment from "moment";
import CalendarTable from "../../components/Calendar/CalendarTable";

const PageCalendar = () => {
    return (
        <React.Fragment>
            <section className="calendar">

                <CalendarTable date={moment('2020-03-03')} />

            </section>
        </React.Fragment>
    );
};

export default PageCalendar;
