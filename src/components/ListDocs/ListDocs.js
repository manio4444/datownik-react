import React, { useEffect, useState } from 'react';

import { getDocs } from './actions';

export default function ListDocs() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getDocs().then(({ data }) => {
      console.log('### getDocs', data);
      setDocs(data.result);
    });
  }, []);

  return (
    <div className="docs__list">
      {docs.map((doc) => (
        <div key={doc.id}>{doc.title}</div>
      ))}
    </div>
  );
}
