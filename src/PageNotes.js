import React, {Component} from 'react';
import ListNotes from "./ListNotes";

class PageNotes extends Component {

    render() {
        return (
        <React.Fragment>
            <section className="notes">

                <ListNotes
                    viewOnly={false}
                    limit={0}
                />

            </section>
        </React.Fragment>
        );
    }
}

export default PageNotes;
