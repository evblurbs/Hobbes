import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import PottyLogger from './Loggers/PottyLogger';
import FoodLogger from './Loggers/FoodLogger';
import Header from './Loggers/Header';
import reactMixin from 'react-mixin';
import reactTimerMixin from 'react-timer-mixin';
import { addLog } from '../api/api';

export default class Logger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      peeCount: 1,
      poopCount: 0,
      mealCount: 9999,
    };
  }

  _updateLoggers() {
    var peeCount = this.state.peeCount;
    var poopCount = this.state.poopCount;
    var mealCount = this.state.mealCount;
    var logs = this.state.logs;
    var el = logs.pop();
    switch(el) {
      case 'Pee Break':
        peeCount = peeCount + 1;
        break;
      case 'Poop Break':
        poopCount = poopCount - 1;
        break;
      case 'Meal Break':
        mealCount = mealCount - 1;
        break;
      default:
        break;
    }

    this.setState({
      logs: logs,
      peeCount: peeCount,
      poopCount: poopCount,
      mealCount: mealCount,
    });
  }

  _onLogEvent(name, data) {
    var logs = this.state.logs;
    logs.unshift(name);
    this.setState({ logs: logs });
    addLog(this.props.pupId, {
      ...data,
      ownerName: this.props.ownerName,
      ownerId: this.props.ownerId,
    });
    this.setTimeout(this._updateLoggers, 3000);
  }

  render() {
    return (
      <View>
        <Header name={this.props.pupName} logs={this.state.logs} />
        <PottyLogger
          name={this.props.pupName}
          key={this.state.peeCount}
          title={'pee break'}
          type={'PEE'}
          onLog={this._onLogEvent.bind(this)} />
        <PottyLogger
          name={this.props.pupName}
          key={this.state.poopCount}
          title={'poop break'}
          type={'POOP'}
          onLog={this._onLogEvent.bind(this)} />
        <FoodLogger
          name={this.props.pupName}
          key={this.state.mealCount}
          onLog={this._onLogEvent.bind(this)} />
      </View>
    );
  }
}

reactMixin(Logger.prototype, reactTimerMixin);

Logger.propTypes = {
  pupName: PropTypes.string,
};

Logger.defaultProps = {
  pupName: 'your pup'
};