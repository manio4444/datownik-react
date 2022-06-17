import React, { useEffect, useState } from 'react';

import './ListDocs.scss';

import { getDocs } from './actions';
import ListDocsCard from 'components/ListDocsCard/ListDocsCard';

export default function ListDocs() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderPlaceholders = function () {
    const placeholdersRender = [];
    const placeholdersCount = 9;

    for (let i = 0; i < placeholdersCount; i++) {
      placeholdersRender.push(
        <li key={i} className={'docs__list-item'}>
          <ListDocsCard placeholder />
        </li>
      );
    }

    return <>{placeholdersRender}</>;
  };
  const renderItems = function () {
    return (
      <>
        <li className={'docs__list-item docs__list-item--new'}>
          <ListDocsCard
            addNew
            txt="&nbsp;"
            title="&nbsp;"
            date_start="&nbsp;"
            date_edit="&nbsp;"
          />
        </li>
        {docs.map((doc) => (
          <li key={doc.id} className={'docs__list-item'}>
            <ListDocsCard
              id={doc.id}
              txt={doc.txt}
              title={doc.title}
              date_start={doc.date_start}
              date_edit={doc.date_edit}
            />
          </li>
        ))}
      </>
    );
  };

  useEffect(() => {
    getDocs()
      .then(({ data }) => {
        setDocs(data.result);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ul className="docs__list">
      {loading ? renderPlaceholders() : renderItems()}
    </ul>
  );
}
