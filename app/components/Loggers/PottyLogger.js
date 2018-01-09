import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import { toTitleCase, capitalizeFirstLetter } from '../../utils/strings';
import AnimatedBar from '../AnimatedBar';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { formatDate } from '../../utils/strings';

export default class PottyLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogging: false,
      isLogged: false,
      time: null,
    };
  }

  _onPress() {
    this.setState({
      isLogging: !this.state.isLogging,
      time: this.state.isLogging ? null : new Date(),
    });
  }

  _isLogged(logTime) {
    if(logTime == this.state.time) {
      this.setState({ isLogged: true });
      this.props.onLog(toTitleCase(this.props.title), {
        type: this.props.type,
        time: this.state.time,
        timestamp: this.state.time.getTime(),
      });
    }
  }

  _loadIcon() {
    if(this.state.isLogged) {
      return (
        <MaterialIcons name="check" size={32} style={styles.chevron} />
      );
    }
    if(this.state.isLogging) {
      return (
        <Spinner color={'#4E342E'} />
      );
    } else {
      switch(this.props.type) {
        case 'PEE':
          return ( <Entypo name="water" size={32} style={styles.chevron} /> );
          break;
        case 'POOP':
          return ( <MaterialCommunityIcons name="emoticon-poop" size={32} style={styles.chevron} /> );
          break;
        default:
          break;
      }
    }
  }

  _renderDesc() {
    var time = this.state.time;
    var isLogged = this.state.isLogged;
    if(time && isLogged) {
      return `${capitalizeFirstLetter(this.props.title)} logged at ${formatDate(time)}.`
    }
    if(time) {
      return `Logging ${this.props.title} at ${formatDate(time)}. Tap here to cancel.`;
    } else {
      return `Tap here to log a ${this.props.title} for ${this.props.name}!`;
    }
  }

  render() {
    return (
      <TouchableOpacity style={StyleSheet.flatten([styles.container, this.props.style])} onPress={this._onPress.bind(this)}>
        <LinearGradient colors={['rgba(188,170,164,0.8)', 'rgba(188,170,164,0.6)']} style={StyleSheet.absoluteFill} />
        {this.state.isLogging ? <AnimatedBar delay={2000} onComplete={this._isLogged.bind(this)} logTime={this.state.time} /> : null }
        <View style={{width: 32}}>
          {this._loadIcon()}
        </View>
        <View style={styles.textView}>
          <Text style={styles.header}>{toTitleCase(this.props.title)}</Text>
          <Text style={styles.description}>{this._renderDesc()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

PottyLogger.propTypes = {
  name: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#4E342E',
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
  },
  header: {
    color: '#4E342E',
    fontFamily: 'roboto-bold',
    fontSize: 18,
    marginBottom: 3,
  },
  description: {
    color: '#4E342E',
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    lineHeight: 22,
    paddingRight: 20,
    minHeight: 44,
  },
  chevron: {
    color: '#4E342E',
  },
});