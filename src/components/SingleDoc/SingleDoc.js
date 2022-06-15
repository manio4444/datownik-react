import React, { useEffect, useState } from 'react';

import './SingleDoc.scss';

import { getDoc } from './actions';
import Placeholder from 'components/Placeholder/Placeholder';

export default function SingleDoc({ id }) {
  const [docData, setDocData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc({ id })
      .then(({ data }) => {
        setDocData(data.result);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="docs__single">
      <h2>{loading ? <Placeholder /> : docData.title}</h2>

      {loading ? (
        <div className="docs__single_container" style={{ padding: 30 }}>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </div>
      ) : (
        <div
          className="docs__single_container"
          dangerouslySetInnerHTML={{ __html: docData.txt }}
        />
      )}
    </div>
  );
}
