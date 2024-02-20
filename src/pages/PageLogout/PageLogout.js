import React, { useEffect } from 'react';
import ListTodo from 'components/Todo/ListTodo';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'router/consts';

const PageLogout = ({ logout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate(RouterPaths.START, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="logout">
      <ListTodo viewOnly={false} limit={0} placeholders={5} />
    </section>
  );
};

export default PageLogout;
