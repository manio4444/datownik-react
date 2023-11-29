import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { getDiffTimestamps } from 'utils/commonTime';
import Placeholder from 'components/Placeholder/Placeholder';

import 'semantic-ui-css/components/card.min.css';
import 'semantic-ui-css/components/icon.min.css';

import './ListSingleEvent.scss';
class ListSingleEvent extends Component {
  interval = null; // can't be in state
  state = {
    countdown: '',
  };

  componentDidMount() {
    this.renderCountdown();
    this.interval = setInterval(() => {
      this.renderCountdown();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderCountdown = () => {
    const nowTs = new Date().getTime();
    const deadlineTs = new Date(this.props.date).getTime();
    const diff = getDiffTimestamps(nowTs, deadlineTs);
    const countdown = `${diff.days} Dni, ${diff.hours} Godz. ${diff.minutes} Min. ${diff.seconds} Sek.`;

    this.setState({ countdown });
  };

  render() {
    const { props, state } = this;

    return (
      <Card className={`ListSingleEvent ${props.type}`}>
        <Card.Content>
          <Card.Header>
            {props.placeholder && <Placeholder />}
            {!props.placeholder && props.title}
          </Card.Header>
          <Card.Meta>
            {props.placeholder && <Placeholder />}
            {!props.placeholder && props.date}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          {props.placeholder && <Placeholder />}
          {!props.placeholder && <Icon name="stopwatch" />}
          {!props.placeholder && state.countdown}
        </Card.Content>
      </Card>
    );
  }
}

export default ListSingleEvent;
