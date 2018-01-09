import React from 'react';
import { View, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const appScreen = Dimensions.get('window');

export default class AnimatedBar extends React.Component {
  constructor(props) {
    super(props);
    this._width = new Animated.Value(0);
  }

  animateTo(delay, value) {
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(this._width, {
        toValue: value,
        duration: this.props.duration,
      }),
    ]).start(() => this.props.onComplete(this.props.logTime));
  }

  componentDidMount() {
    this.animateTo(this.props.delay, appScreen.width);
  }

  render() {
    const barStyles = {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: this._width,
      backgroundColor: this.props.color,
    };
    return (
      <Animated.View style={barStyles} />
    );
  }
}

AnimatedBar.propTypes = {
  delay: PropTypes.number,
  color: PropTypes.string,
  duration: PropTypes.number,
  onComplete: PropTypes.func,
};

AnimatedBar.defaultProps = {
  delay: 0,
  color: '#BCAAA4',
  duration: 1500,
};
