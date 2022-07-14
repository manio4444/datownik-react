import React, { Component } from 'react';

import { getFutureEvents } from './actions';
import ListSingleEvent from './ListSingleEvent';

class ListCalendar extends Component {
  state = {
    list: [],
    fetchingData: true,
    placeholders: Number.isInteger(this.props.placeholders)
      ? this.props.placeholders
      : 3,
  };

  mapQuery = (data) => ({
    id: data.id,
    title: data.txt,
    date: data.data,
  });

  getTodoList() {
    getFutureEvents({
      limit: this.props.limit,
    })
      .then((res) => {
        this.setState({
          list: res.data.result.map((event) => this.mapQuery(event)),
          fetchingData: false,
        });
      })
      .catch((error) => console.error(error));
  }

  componentDidMount() {
    this.getTodoList();
  }

  render() {
    const { state } = this;
    const placeholdersRender = [];

    for (let i = 0; i < state.placeholders; i++) {
      placeholdersRender.push(
        <ListSingleEvent key={i} placeholder {...this.props} />
      );
    }

    return (
      <div className="events__list">
        {state.fetchingData && (
          <React.Fragment>{placeholdersRender}</React.Fragment>
        )}

        {!state.fetchingData &&
          state.list.map((event) => {
            return <ListSingleEvent key={event.id} {...event} />;
          })}
      </div>
    );
  }
}

export default ListCalendar;
