import React from 'react';
import SingleNote from 'components/Notes/SingleNote';

const ResultsNotes = ({ data }) => (
  <React.Fragment>
    <SingleNote style={{ opacity: 0 }} /> {/*for css hack*/}
    <div className={'multisearch__result-notes'}>
      {data.map((el) => (
        <SingleNote key={el.id} value={el.txt} readonly />
      ))}
    </div>
  </React.Fragment>
);

export default ResultsNotes;
