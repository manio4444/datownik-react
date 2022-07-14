import React from 'react';
import { useParams } from 'react-router';

import ListDocs from 'components/ListDocs/ListDocs';
import SingleDoc from 'components/SingleDoc/SingleDoc';

const PageDocs = ({ edit }) => {
  let routerParams = useParams();

  const singleDocId = routerParams.id;

  return (
    <section className="docs docs__page">
      {singleDocId ? (
        <SingleDoc id={singleDocId} edit={edit} />
      ) : (
        <ListDocs viewOnly={false} limit={0} placeholders={5} />
      )}
    </section>
  );
};

export default PageDocs;
