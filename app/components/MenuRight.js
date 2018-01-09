import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';

export default class MenuRight extends React.Component {
  render() {
    return (
      <TouchableOpacity style={StyleSheet.flatten([styles.container, this.props.style])} onPress={this.props.onPress}>
        <LinearGradient colors={['rgba(188,170,164,0.8)', 'rgba(188,170,164,0.6)']} style={StyleSheet.absoluteFill} />
        <View style={styles.textView}>
          <Text style={styles.header}>{this.props.title}</Text>
          <Text style={this.props.error ? styles.descError : styles.description}>{this.props.description}</Text>
        </View>
        <Entypo name="chevron-thin-right" size={32} style={styles.chevron} />
      </TouchableOpacity>
    );
  }
}

MenuRight.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  error: PropTypes.bool,
};

MenuRight.defaultProps = {
  style: {},
  error: false,
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
    paddingRight: 20,
  },
  descError: {
    color: '#BF360C',
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    paddingRight: 20,
  },
  chevron: {
    color: '#4E342E',
  },
});