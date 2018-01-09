import React from 'react';
import { StyleSheet, Text, View, Image, Slider, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';

export default class FoodLogger extends React.Component {
  constructor(props) {
    super(props);
  }
  _renderDesc() {
    var logs = this.props.logs;
    if(logs.length > 1) {
      return `${logs.join(' and ')} logged!`;
    } else if (logs.length === 1) {
      return `${logs.join(' and ')} logged for ${this.props.name}!`;
    } else {
      return `Log activity for ${this.props.name} below!`
    }
  }
  render() {
    var isLogs = this.props.logs.length;
    return (
      <View style={isLogs ? styles.loggedContainer : styles.container}>
        <Text style={isLogs ? styles.loggedHeader : styles.header}>{this._renderDesc()}</Text>
      </View>
    );
  }
}

FoodLogger.propTypes = {
  name: PropTypes.string,
  logs: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#4E342E',
    backgroundColor: '#4E342E',
    paddingLeft: 20,
    paddingTop: 7,
    paddingRight: 10,
    paddingBottom: 7,
  },
  loggedContainer: {
    borderBottomWidth: 1,
    borderColor: '#4E342E',
    backgroundColor: '#D7CCC8',
    paddingLeft: 20,
    paddingTop: 7,
    paddingRight: 10,
    paddingBottom: 7,
  },
  header: {
    color: '#D7CCC8',
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 3,
  },
  loggedHeader: {
    color: '#4E342E',
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 1,
    marginBottom: 2,
  },
});