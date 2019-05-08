import React, {Component} from 'react';
import 'semantic-ui-css/components/button.css'; // TODO - import this in specific component
import 'semantic-ui-css/components/card.css'; // TODO - import this in specific component
import 'semantic-ui-css/components/icon.css'; // TODO - import this in specific component
import './css/notes.css'; // TODO - import this in notes component
import {Link} from "react-router-dom";
import ListNotes from "./ListNotes";

class PageStart extends Component {
    render() {
        return (
        <div className={"PageStart"}>
          <section id="main_page">

            <form method="POST" className="start_form">

              <h1 className="start_form_title">Multicontent:</h1>
              <textarea name="urladd" rows="5" cols="100"></textarea>


              <div className="ui vertical buttons">

                <button type="send" name="action" className="ui labeled icon button" value="zadanie">
                  <span className="far fa-calendar-check icon"></span>
                  <span>Zadanie</span>
                </button>

                <button type="send" name="action" className="ui labeled icon button" value="wydarzenie">
                  <span className="far fa-calendar icon"></span>
                  <span>Wydarzenie</span>
                </button>

                <button type="send" name="action" className="ui labeled icon button" value="zakladka">
                  <span className="fas fa-external-link-square-alt icon"></span>
                  <span>Zakładka</span>
                </button>

                <button type="send" name="action" className="ui labeled icon button" value="notatka">
                  <span className="far fa-sticky-note icon"></span>
                  <span>Notatka</span>
                </button>

                <button type="send" name="action" className="ui labeled icon disabled button" value="dokument">
                  <span className="far fa- icon"></span>
                  <span>Dokument</span>
                </button>

                <button type="send" name="action" className="ui labeled icon disabled button" value="kontakt">
                  <span className="far fa- icon"></span>
                  <span>Kontakt</span>
                </button>

                <button type="send" name="action" className="ui labeled icon disabled button" value="kod/haslo">
                  <span className="far fa- icon"></span>
                  <span>Kod/hasło</span>
                </button>

              </div>

            </form>

            <div className="main_page_dates">

              <h1 className="start_form_title">Kalendarz:</h1>


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


              <a className="ui button fluid" href="?page=kalendarz">Zobacz wszystkie</a>

            </div>


            <div className="main_page_dates">

              <h1 className="start_form_title">To do:</h1>


              <div className="ui card teal task" data-task="57">
                <input type="hidden" data-timer-deadline="" value="2019-02-06 19:00:00" />
                  <div className="content">
                    <div className="header">kossmann basket3 timeout 1s</div>
                    <div className="meta">2019-02-06 19:00:00</div>

                  </div>
                  <div className="extra content error">
                    <i className="fas fa-stopwatch"></i>
                    <span type="text" name="" data-timer-output="" value="">-28 Dni, -16 Godz. -52 Min. -10 Sek.</span>

                  </div>
              </div>


              <div className="ui card teal task" data-task="56">
                <input type="hidden" data-timer-deadline="" value="0000-00-00 00:00:00" />
                  <div className="content">
                    <div className="header">spróbować zrobić namiot z zipów i patyków</div>
                    <div className="meta">0000-00-00 00:00:00</div>

                  </div>
                  <div className="extra content">
                    <i className="fas fa-stopwatch"></i>
                    <span type="text" name="" data-timer-output="" value=""></span>

                  </div>
              </div>


              <div className="ui card teal task" data-task="55">
                <input type="hidden" data-timer-deadline="" value="0000-00-00 00:00:00" />
                  <div className="content">
                    <div className="header">druknąć faktury orange</div>
                    <div className="meta">0000-00-00 00:00:00</div>

                  </div>
                  <div className="extra content">
                    <i className="fas fa-stopwatch"></i>
                    <span type="text" name="" data-timer-output="" value=""></span>

                  </div>
              </div>


              <div className="ui card teal task" data-task="54">
                <input type="hidden" data-timer-deadline="" value="0000-00-00 00:00:00" />
                  <div className="content">
                    <div className="header">druknać fakturę wfirma i sprawdzić resztę</div>
                    <div className="meta">0000-00-00 00:00:00</div>

                  </div>
                  <div className="extra content">
                    <i className="fas fa-stopwatch"></i>
                    <span type="text" name="" data-timer-output="" value=""></span>

                  </div>
              </div>


              <div className="ui card teal task" data-task="47">
                <input type="hidden" data-timer-deadline="" value="0000-00-00 00:00:00" />
                  <div className="content">
                    <div className="header">obczaić paliwo tańsze alior</div>
                    <div className="meta">0000-00-00 00:00:00</div>

                  </div>
                  <div className="extra content">
                    <i className="fas fa-stopwatch"></i>
                    <span type="text" name="" data-timer-output="" value=""></span>

                  </div>
              </div>


              <a className="ui button fluid" href="?page=do-zrobienia">Zobacz wszystkie</a>

            </div>



            <pre>    Current PHP version: 5.6.40  </pre>
            <pre>    https://stackoverflow.com/questions/18377891/how-can-i-let-user-paste-image-data-from-the-clipboard-into-a-canvas-element-in
  </pre>
            <pre>    do code snippetów -
    https://codepen.io/chriscoyier/pen/GBbOJd
  </pre>

          </section>

          <section id="main_page_notes">

            <h1 className="notes_title">Ostatnie notatki:</h1>

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
