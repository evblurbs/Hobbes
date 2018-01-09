import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';

export default class AgeIntervals extends React.Component {
  constructor(props) {
    super(props);
    const bday = new Date(props.bday);
    this.state = {
      weeks: this.calculateWeeks(bday),
    };
  }
  calculateWeeks(bday) {
    const today = new Date();
    const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
    const diff = today.getTime() - bday.getTime();
    return Math.floor(diff / ONE_WEEK);
  }
  calculateDogYears(weeks) {
    const years = (weeks / 52) * 7;
    return years.toFixed(1);
  }
  calculateIntervals(weeks) {
    const interval = weeks / 4;
    const hours = Math.floor(interval);
    const minutes = (interval % 1) * 60;
    return `${hours} hrs ${minutes} min`;
  }
  render() {
    return (
      <View style={StyleSheet.flatten([styles.container, this.props.style])}>
        <LinearGradient colors={['rgba(188,170,164,0.8)', 'rgba(188,170,164,0.6)']} style={StyleSheet.absoluteFill} />
        <View style={styles.textView}>
          <Text style={styles.header}>Age: {this.state.weeks} weeks ({this.calculateDogYears(this.state.weeks)} dog years)</Text>
          <Text style={styles.description}>Potty Interval: {this.calculateIntervals(this.state.weeks)}</Text>
        </View>
      </View>
    );
  }
}

AgeIntervals.propTypes = {
  bday: PropTypes.string,
};

AgeIntervals.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
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
  },
  header: {
    color: '#4E342E',
    fontFamily: 'roboto-bold',
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    color: '#4E342E',
    fontFamily: 'open-sans-regular',
    fontSize: 16,
  },
  chevron: {
    color: '#4E342E',
  },
});