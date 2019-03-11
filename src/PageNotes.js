import React, {Component} from 'react';
import './css/notes.css';

class PageNotes extends Component {
    notes = [
        {
            dataNote: "574",
            value: "test test",
        },
        {
            dataNote: "573",
            value: "MOŻE KANAPA https://allegro.pl/oferta/duza-sofa-czarna-kanapa-owal-retro-design-sassy-6657292829?reco_id=c816d1ef-3a89-11e9-aabe-000af7f5f5c0&amp;sid=041047f9c36843e364ecb91b45c568a2755aa386fe7e14ee7421a14291fbf951",
        },
        {
            dataNote: "572",
            value: "mbank przelew",
        },
        {
            dataNote: "571",
            value: "https://github.com/LineageOS/android_packages_apps_CMWallpapers/tree/cm-14.1/res/drawable-xxxhdpi",
        },
        {
            dataNote: "570",
            value: "DO SNIPPETÓW https://highlightjs.org/",
        },
        {
            dataNote: "568",
            value: "https://fili.cc/serial/brickleberry/312",
        },
        {
            dataNote: "567",
            value: "USUWA NIEPUSHNIĘTE COMMITY, STAN JAK NA REMOTE git reset--hard origin / master",
        }
    ];

    placeholder = {
        adding: "Zacznij wpisywać tekst aby dodać nową notatkę",
        deleting: "Kliknięcie poza notatką spowoduje usunięcie",
    }

    render() {
        return (
        <React.Fragment>

          <section id="main_page_notes">

            <h1 className="notes_title">Ostatnie notatki:</h1>

            <div className="notes_container">

                <div className="note_element">
                            <textarea
                                placeholder={this.placeholder.adding}
                                data-placeholder-deleting={this.placeholder.deleting}
                            />
                    <div className="note_element__progress"/>
                </div>

                {this.notes.map((note) => {
                    return (
                        <div
                            className="note_element"
                            data-note={note.dataNote}
                        >
                            <textarea
                                placeholder={note.placeholder}
                                data-placeholder={note.dataPlaceholder}
                                value={note.value}
                            />
                            <div className="note_element__progress"/>
                        </div>
                    );
                })}

            </div>

          </section>
        </React.Fragment>
        );
    }
}

export default PageNotes;
