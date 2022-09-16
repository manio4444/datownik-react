import React, { useState, useEffect } from 'react';

import 'semantic-ui-css/components/grid.min.css';

const PageBirthdays = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPeriodicEvents();
  }, []);

  const fetchPeriodicEvents = () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <section className="calendar">
        <h1>Wydarzenia cykliczne</h1>
      </section>
    </React.Fragment>
  );
};

export default PageBirthdays;
