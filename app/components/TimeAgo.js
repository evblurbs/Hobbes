import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import reactMixin from 'react-mixin';
import reactTimerMixin from 'react-timer-mixin';
import { formateDateString } from '../utils/strings';

export default class TimeAgo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(props.timestamp),
      timeAgo: null,
    };
  }

  componentWillMount() {
    this._updateTimeAgo();
  }

  _updateTimeAgo() {
    const now = new Date();
    const secondsDiff = Math.floor((now - this.state.date) / 1000);
    if(secondsDiff > (12 * 60 * 60)) {
      return this.setState({ timeAgo: formateDateString(this.state.date) });
    }
    let timeAgo = '';
    const hoursDiff = Math.floor(secondsDiff / 3600);
    if(hoursDiff > 1) {
      timeAgo = `${hoursDiff} hrs `;
    }
    if(hoursDiff === 1) {
      timeAgo = `1 hr `;
    }
    const minsDiff = Math.round((secondsDiff - (hoursDiff * 60 * 60)) / 60);
    timeAgo += `${minsDiff} mins ago`;
    this.setState({ timeAgo: timeAgo });
    const seconds = now.getSeconds();
    this.setTimeout(this._updateTimeAgo, (60000 - (seconds * 1000)));
  }

  render() {
    return (
      <Text>{this.state.timeAgo}</Text>
    );
  }
}

reactMixin(TimeAgo.prototype, reactTimerMixin);

TimeAgo.propTypes = {
  timestamp: PropTypes.number,
};