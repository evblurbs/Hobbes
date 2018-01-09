import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class ButtonPaw extends React.Component {
  render() {
    if(this.props.disabled) {
      return (
        <View style={StyleSheet.flatten([styles.button, styles.disabled, this.props.style])} disabled={this.props.disabled}>
          <View style={styles.buttonView}>
            <View style={styles.leftBlock}>
              <Entypo name="baidu" size={32} style={styles.paw} />
            </View>
            <Text style={styles.buttonText}>{this.props.text}</Text>
            <View style={styles.rightBlock} />
          </View>
        </View>
      );
    }
    else if(this.props.isLoading) {
      return (
        <TouchableOpacity style={StyleSheet.flatten([styles.button, styles.loading, this.props.style])} disabled={true}>
          <View style={styles.buttonView}>
            <View style={styles.leftBlock}>
              <Spinner />
            </View>
            <Text style={styles.buttonText}>{this.props.text}</Text>
            <View style={styles.rightBlock} />
          </View>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={StyleSheet.flatten([styles.button, this.props.style])} onPress={this.props.onPress} disabled={this.props.disabled}>
          <View style={styles.buttonView}>
            <View style={styles.leftBlock}>
              <Entypo name="baidu" size={32} style={styles.paw} />
            </View>
            <Text style={styles.buttonText}>{this.props.text}</Text>
            <View style={styles.rightBlock} />
          </View>
        </TouchableOpacity>
      );
    }

  }
}

ButtonPaw.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

ButtonPaw.defaultProps = {
  style: {},
  disabled: false,
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: '#4E342E',
    height: 50,
  },
  disabled: {
    opacity: 0.6,
  },
  loading: {
    opacity: 0.6,
  },
  enabled: {
    opacity: 1,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#BCAAA4',
    fontSize: 28,
  },
  paw: {
    margin: 9,
    color: '#BCAAA4',
  },
  rightBlock: {
    width: 50,
    height: 50,
  },
  leftBlock: {
    width: 50,
    height: 50,
  }
});