import React from 'react';

import ListDocs from 'components/ListDocs/ListDocs';

const PageDocs = () => {
  return (
    <React.Fragment>
      <section className="docs docs__page">
        <ListDocs viewOnly={false} limit={0} placeholders={5} />
      </section>
    </React.Fragment>
  );
};

export default PageDocs;
