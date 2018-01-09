import React from 'react';
import { StyleSheet, Text, View, Image, Slider, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import AnimatedBar from '../AnimatedBar';
import Spinner from '../Spinner';
import { formatDate } from '../../utils/strings';

export default class FoodLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cups: '0.00',
      cupsInt: 0,
      isLogging: false,
      isLogged: false,
      time: null,
    };
  }

  _onCupsChange(value) {
    var number = value;
    number = (Math.round(number * 4) / 4).toFixed(2);
    this.setState({
      cups: number.toString(),
      cupsInt: parseFloat(number.toString()),
      isLogging: false,
      isLogged: false,
      time: null,
    });
  }

  _onCupsChanged(value) {
    var number = value;
    if(number === 0) {
      return this.setState({
        cups: '0.00',
        cupsInt: 0,
        isLogging: false,
        time: null,
      });
    }
    number = (Math.round(number * 4) / 4).toFixed(2);
    this.setState({
      cups: number.toString(),
      cupsInt: parseFloat(number.toString()),
      isLogging: true,
      time: new Date(),
    });
  }

  _isLogged(logTime) {
    if(logTime === this.state.time) {
      this.setState({ isLogged: true });
      this.props.onLog('Meal Break', {
        type: 'MEAL',
        time: this.state.time,
        timestamp: this.state.time.getTime(),
        cups: this.state.cupsInt,
      });
    }
  }

  _loadIcon() {
    if(this.state.isLogged) {
      return (
        <MaterialIcons name="check" size={32} style={styles.chevron} />
      );
    }
    else if(this.state.isLogging) {
      return (
        <Spinner color={'#4E342E'} />
      );
    }
    else {
      return (
        <MaterialCommunityIcons name="silverware" size={32} style={styles.chevron} />
      );
    }
  }

  _renderDesc() {
    if(this.state.isLogged) {
      return `${this.state.cupsInt} cups of food logged for ${this.props.name}!`;
    }
    else if(this.state.isLogging) {
      return `Logging ${this.state.cupsInt} cups of food for ${this.props.name}. Adjust the slider below to change the amount.`;
    }
    else {
      return `Adjust the slider below to log how much food you fed ${this.props.name}!`;
    }
  }

  render() {
    return (
      <View style={StyleSheet.flatten([styles.container, this.props.style])}>
        <LinearGradient colors={['rgba(188,170,164,0.8)', 'rgba(188,170,164,0.6)']} style={StyleSheet.absoluteFill} />
        {this.state.isLogging ? <AnimatedBar delay={2000} onComplete={this._isLogged.bind(this)} logTime={this.state.time} /> : null }
        <View style={styles.mainContainer}>
          <View style={{width: 32}}>
            {this._loadIcon()}
          </View>
          <View style={styles.textView}>
            <Text style={styles.header}>Meal Time</Text>
            <Text style={styles.description}>{this._renderDesc()}</Text>
          </View>
        </View>
        <View style={styles.mealInfoContainer}>
          <Text style={styles.mealMetric}>Cup(s)</Text>
          <Text style={styles.mealValue}>{this.state.cups}</Text>
        </View>
        <Image source={require('../../../assets/slider.png')} style={{ width: 0, height:0 }} />
        <Slider
          thumbImage={require('../../../assets/slider.png')}
          thumbStyle={{width: 20, height: 20}}
          maximumValue={3}
          disabled={this.state.isLogged}
          onValueChange={this._onCupsChange.bind(this)}
          onSlidingComplete={this._onCupsChanged.bind(this)}
          minimumTrackTintColor={'#4E342E'}
          maximumTrackTintColor={'#a1887f'} />
      </View>
    );
  }
}

FoodLogger.propTypes = {
  name: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#4E342E',
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 3,
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
    minHeight: 66,
  },
  mealMetric: {
    color: '#4E342E',
    fontSize: 12,
  },
  mealValue: {
    color: '#4E342E',
    fontSize: 12,
  },
  image: {
    width: 32,
    height: 32,
  },
  chevron: {
    color: '#4E342E',
  },
});