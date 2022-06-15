import React, { useEffect, useState } from 'react';

import { getDocs } from './actions';
import { Link } from 'react-router-dom';
import { RouterPaths } from 'router/consts';
import Placeholder from 'components/Placeholder/Placeholder';

export default function ListDocs() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {loading ? (
        <>
          <Placeholder />
          <br />
          <Placeholder />
          <br />
          <Placeholder />
          <br />
          <Placeholder />
          <br />
          <Placeholder />
          <br />
          <Placeholder />
          <br />
        </>
      ) : (
        docs.map((doc) => (
          <li key={doc.id}>
            <Link to={`/${RouterPaths.DOCS_SINGLE.replace(':id', doc.id)}`}>
              {doc.title}
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}
