import React, { Component } from 'react';
import ListTodo from 'components/Todo/ListTodo';

class PageTodo extends Component {
  render() {
    return (
      <section className="todos todos__page">
        <ListTodo viewOnly={false} limit={0} placeholders={5} />
      </section>
    );
  }
}

export default PageTodo;
