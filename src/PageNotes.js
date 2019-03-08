import React, {Component} from 'react';
import './css/notes.css';

class PageStart extends Component {
    render() {
        return (
        <React.Fragment>

          <section id="main_page_notes">

            <h1 className="notes_title">Ostatnie notatki:</h1>

            <div className="notes_container">


              <div className="note_element">
                <textarea placeholder="Zacznij wpisywać tekst aby dodać nową notatkę"
                          data-placeholder="Kliknięcie poza notatką spowoduje usunięcie" data-note=""></textarea>

                <div className="note_element__progress"></div>
              </div>

                <div className="note_element">
                    <textarea placeholder="Zacznij wpisywać tekst aby dodać nową notatkę"
                              data-placeholder="Kliknięcie poza notatką spowoduje usunięcie" data-note="574" value="test test"></textarea>

                    <div className="note_element__progress"></div>
                </div>

              <div className="note_element">
                <textarea placeholder="Zacznij wpisywać tekst aby dodać nową notatkę"
                          data-placeholder="Kliknięcie poza notatką spowoduje usunięcie" data-note="573" value="MOŻE KANAPA https://allegro.pl/oferta/duza-sofa-czarna-kanapa-owal-retro-design-sassy-6657292829?reco_id=c816d1ef-3a89-11e9-aabe-000af7f5f5c0&amp;sid=041047f9c36843e364ecb91b45c568a2755aa386fe7e14ee7421a14291fbf951"></textarea>

                <div className="note_element__progress"></div>
              </div>

              <div className="note_element">
                <textarea placeholder="Zacznij wpisywać tekst aby dodać nową notatkę"
                          data-placeholder="Kliknięcie poza notatką spowoduje usunięcie"
                          data-note="572" value="mbank przelew"></textarea>

                <div className="note_element__progress"></div>
              </div>

              <div className="note_element">
                <textarea placeholder="Zacznij wpisywać tekst aby dodać nową notatkę"
                          data-placeholder="Kliknięcie poza notatką spowoduje usunięcie"
                          data-note="571" value="https://github.com/LineageOS/android_packages_apps_CMWallpapers/tree/cm-14.1/res/drawable-xxxhdpi"></textarea>

                <div className="note_element__progress"></div>
              </div>

              <div className="note_element">
                <textarea placeholder="Zacznij wpisywać tekst aby dodać nową notatkę"
                          data-placeholder="Kliknięcie poza notatką spowoduje usunięcie" data-note="570" value="DO SNIPPETÓW https://highlightjs.org/"></textarea>

                <div className="note_element__progress"></div>
              </div>

              <div className="note_element">
                <textarea placeholder="Zacznij wpisywać tekst aby dodać nową notatkę"
                          data-placeholder="Kliknięcie poza notatką spowoduje usunięcie"
                          data-note="568" value="https://fili.cc/serial/brickleberry/312"></textarea>

                <div className="note_element__progress"></div>
              </div>

              <div className="note_element">
      <textarea placeholder="Zacznij wpisywać tekst aby dodać nową notatkę"
                data-placeholder="Kliknięcie poza notatką spowoduje usunięcie" data-note="567" value="USUWA NIEPUSHNIĘTE COMMITY, STAN JAK NA REMOTE
git reset --hard origin/master"></textarea>

                <div className="note_element__progress"></div>
              </div>

            </div>

          </section>
        </React.Fragment>
        );
    }
}

export default PageStart;
