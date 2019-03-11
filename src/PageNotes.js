import React, {Component} from 'react';
import SingleNote from './SingleNote';
import './css/notes.css';

class PageNotes extends Component {
    notes = [
        {
            id: "574",
            value: "test test",
        },
        {
            id: "573",
            value: "MOŻE KANAPA https://allegro.pl/oferta/duza-sofa-czarna-kanapa-owal-retro-design-sassy-6657292829?reco_id=c816d1ef-3a89-11e9-aabe-000af7f5f5c0&amp;sid=041047f9c36843e364ecb91b45c568a2755aa386fe7e14ee7421a14291fbf951",
        },
        {
            id: "572",
            value: "mbank przelew",
        },
        {
            id: "571",
            value: "https://github.com/LineageOS/android_packages_apps_CMWallpapers/tree/cm-14.1/res/drawable-xxxhdpi",
        },
        {
            id: "570",
            value: "DO SNIPPETÓW https://highlightjs.org/",
        },
        {
            id: "568",
            value: "https://fili.cc/serial/brickleberry/312",
        },
        {
            id: "567",
            value: "USUWA NIEPUSHNIĘTE COMMITY, STAN JAK NA REMOTE git reset--hard origin / master",
        }
    ];

    render() {
        return (
        <React.Fragment>

          <section className="notes">

            <div className="notes_container">

                <SingleNote />

                {this.notes.map((note) => {
                    return (
                        <SingleNote key={note.id} id={note.id} value={note.value} />
                    );
                })}

            </div>

          </section>
        </React.Fragment>
        );
    }
}

export default PageNotes;
