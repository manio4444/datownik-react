import React, {Component} from 'react';
import 'semantic-ui-css/components/button.min.css'; // TODO - import this in specific component
import 'semantic-ui-css/components/card.min.css'; // TODO - import this in specific component
import 'semantic-ui-css/components/icon.min.css'; // TODO - import this in specific component
import './assets/scss/semantic-custom.scss';
import './PageStart.scss';
import {Link} from "react-router-dom";
import ListNotes from "./ListNotes";
import Multicontent from "./Multicontent";
import { Input, Button } from "semantic-ui-react";
import ListTodo from "./ListTodo";

class PageStart extends Component {
    render() {
        return (
        <div className='PageStart'>
          <section id="main_page" className='page__section'>

            <div className='page__container PageStart__first-section'>

              <div className=" page__grid-half">

                <div className="multisearch">

                  <h2 className="multisearch__title">Multi Search:</h2>

                  <Input
                      fluid
                      placeholder='Not working yet'
                      icon='search'
                      iconPosition='left'
                      action={{
                        color: 'purple',
                        content: 'Szukaj',
                      }}
                  />

                </div>

                <div className="page__divider"/>

                <div className="multicontent">

                  <h2 className="multicontent__title">Multicontent:</h2>

                  <Multicontent/>

                </div>

              </div>


            <div className="main_page_dates page__grid-quarter">

              <h2 className="start_form_title">Kalendarz:</h2>


              <div className="ui card red task" data-task="90">
                <input type="hidden" data-timer-deadline="" value="2020-06-13 21:09:00" />
                  <div className="content">
                    <div className="header">Dominik wesele</div>
                    <div className="meta">2020-06-13 21:09:00</div>

                  </div>
                  <div className="extra content">
                    <i className="fas fa-stopwatch"></i>
                    <span type="text" name="" data-timer-output="" value="">465 Dni, 9 Godz. 17 Min. 50 Sek.</span>

                  </div>
              </div>


              <Button fluid color='purple'>Zobacz wszystkie</Button>

            </div>


            <div className="main_page_dates page__grid-quarter">

              <h2 className="start_form_title">To do:</h2>

              <ListTodo
                  viewOnly={true}
                  limit={5}
                  getFinished={false}
              />

              <Link to="/do-zrobienia">
                <Button fluid color='purple'>Zobacz wszystkie</Button>
              </Link>

            </div>

            </div>

            <div className="page__container">
            <pre>    Current PHP version: 5.6.40  </pre>
            <pre>    https://stackoverflow.com/questions/18377891/how-can-i-let-user-paste-image-data-from-the-clipboard-into-a-canvas-element-in
  </pre>
            <pre>    do code snippetów -
    https://codepen.io/chriscoyier/pen/GBbOJd
  </pre>
            </div>


    </section>

          <section id="main_page_notes">

            <h2 className="notes_title">Ostatnie notatki:</h2>

            <ListNotes
              viewOnly={false}
              limit={7}
            />

            <div className="notes_more">
              <Link className="ui button" to="/notatki">Zobacz wszystkie</Link>
            </div>

          </section>
        </div>
        );
    }
}

export default PageStart;
