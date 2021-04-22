import React  from 'react';
import 'semantic-ui-css/components/button.min.css'; // TODO - import this in specific component
import 'semantic-ui-css/components/card.min.css'; // TODO - import this in specific component
import 'semantic-ui-css/components/icon.min.css'; // TODO - import this in specific component
import './PageStart.scss';
import { Link } from "react-router-dom";
import { RouterPaths } from "../../router/consts";
import ListNotes from "../../components/Notes/ListNotes";
import Multicontent from "../../components/Multicontent/Multicontent";
import MultiSearch from "../../components/MultiSearch/MultiSearch";
import { Button } from "semantic-ui-react";
import ListTodo from "../../components/Todo/ListTodo";
import ListCalendar from "../../components/Calendar/ListCalendar";

const PageDivider = () => <div className="page__divider"/>;
const FirstSectionTitle = ({value}) => <h2 className="title">{value}</h2>;

const PageStart = () => {
        return (
            <div className='PageStart'>
                <section id="main_page" className='page__section'>

                    <div className='page__container PageStart__first-section'>

                        <div className="page__grid-half">

                            <FirstSectionTitle value="Multi Search:" />

                            <MultiSearch/>

                            <PageDivider />

                            <FirstSectionTitle value="Multicontent" />

                            <Multicontent/>

                        </div>


                        <div className="main_page_dates page__grid-quarter">

                            <h2 className="start_form_title">Kalendarz:</h2>

                            <ListCalendar limit={5}/>

                            <Link to={`/${RouterPaths.CALENDAR}`}>
                                <Button fluid style={{marginTop: '1em'}}>Zobacz wszystkie</Button>
                            </Link>

                        </div>


                        <div className="main_page_dates page__grid-quarter">

                            <h2 className="start_form_title">To do:</h2>

                            <ListTodo
                                viewOnly={true}
                                limit={5}
                                getFinished={false}
                            />

                            <Link to={`/${RouterPaths.TODO}`}>
                                <Button fluid style={{marginTop: '1em'}}>Zobacz wszystkie</Button>
                            </Link>

                        </div>

                    </div>

                </section>

                <section id="main_page_notes">

                    <h2 className="notes_title">Ostatnie notatki:</h2>

                    <ListNotes
                        viewOnly={false}
                        limit={7}
                    />

                    <div className="notes_more">
                        <Link className="ui button" to={`/${RouterPaths.NOTES}`}>Zobacz wszystkie</Link>
                    </div>

                </section>

                <section id="main_page" className='page__section'>
                    <div className="page__container">
                        <pre>https://stackoverflow.com/questions/18377891/how-can-i-let-user-paste-image-data-from-the-clipboard-into-a-canvas-element-in</pre>
                    </div>
                </section>


            </div>
        );
    }

export default PageStart;
