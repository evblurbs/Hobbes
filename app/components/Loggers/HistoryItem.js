import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, ScrollView, View, TouchableOpacity } from 'react-native';
import { BlurView, LinearGradient } from 'expo';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { formateDateString } from '../../utils/strings';
import { deleteLog } from '../../api/api';
import TimeAgo from '../TimeAgo';
import Spinner from '../Spinner';
import AnimatedBar from '../AnimatedBar';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class HistoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
      isDeleted: false,
      time: null,
    };
  }

  _renderIcon(type) {
    switch(type) {
      case 'PEE':
        return ( <Entypo name="water" size={32} style={styles.chevron} /> );
        break;
      case 'POOP':
        return ( <MaterialCommunityIcons name="emoticon-poop" size={32} style={styles.chevron} /> );
        break;
      case 'MEAL':
        return ( <MaterialCommunityIcons name="silverware" size={32} style={styles.chevron} /> );
        break;
      default:
        break;
    }
  }

  _renderHeader(type, cups) {
    switch(type) {
      case 'PEE':
      case 'POOP':
        return this._breakString(type);
        break;
      case 'MEAL':
        const cupsStr = cups > 1 ? 'Cups' : 'Cup';
        return `${cups} ${cupsStr} of Food`;
        break;
      default:
        break;
    }
  }

  _breakString(type) {
    switch(type) {
      case 'PEE':
        return 'Pee Break';
        break;
      case 'POOP':
        return 'Poop Break';
        break;
      case 'MEAL':
        return 'Meal Break';
        break;
      default:
        break;
    }
  }

  _renderDescription() {
    if(this.state.isDeleting || this.state.isDeleted) {
      return (
        <Text style={styles.description}>Deleting {this._breakString(this.props.type)} from <TimeAgo timestamp={this.props.timestamp} />. Tap here to cancel.</Text>
      );
    } else {
      return (
        <Text style={styles.description}><TimeAgo timestamp={this.props.timestamp} /></Text>
      );
    }
  }

  _renderByLine() {
    if(!this.state.isDeleted && !this.state.isDeleting) {
      return (
        <Text style={styles.byLine}>{`Logged by ${this.props.ownerName}`}</Text>
      );
    }
  }

  _renderDeleteIcon() {
    if(this.state.isDeleted) {
      return <View style={{width: 20}} />;
    }
    else if(this.state.isDeleting) {
      return (
        <Spinner color={'#4E342E'} size={20} />
      );
    } else {
      return (
        <Ionicons name="ios-close" size={40} style={styles.chevron} />
      );
    }
  }

  _initDeleting() {
    this.setState({
      isDeleting: true,
      time: new Date(),
    });
  }

  _cancelDelete() {
    this.setState({
      isDeleting: false,
      isDeleted: false,
      time: null,
    });
  }

  _isDeleted(logTime) {
    if(logTime === this.state.time) {
      deleteLog(this.props.pupId, this.props.id);
      this.setState({
        isDeleting: false,
        isDeleted: true,
        time: null,
      });
      this._root.setOpacityTo(0.2, 2000);
    }
  }

  render() {
    return (
      <TouchableOpacity
        ref={component => this._root = component}
        disabled={!this.state.isDeleting}
        style={this.props.index === 0 ? styles.logItemFirst : styles.logItem}
        onPress={this._cancelDelete.bind(this)}
      >
        <LinearGradient colors={['rgba(188,170,164,0.8)', 'rgba(188,170,164,0.6)']} style={StyleSheet.absoluteFill} />
        {(this.state.isDeleting || this.state.isDeleted) ? <AnimatedBar delay={2000} onComplete={this._isDeleted.bind(this)} logTime={this.state.time} /> : null }
        <View style={{width: 32}}>
          {this._renderIcon(this.props.type)}
        </View>
        <View style={styles.textView}>
          <Text style={styles.header}>{this._renderHeader(this.props.type, this.props.cups)}</Text>
          {this._renderDescription()}
          {this._renderByLine()}
        </View>
        <TouchableOpacity onPress={this._initDeleting.bind(this)}>
          {this._renderDeleteIcon()}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

HistoryItem.propTypes = {
  ownerName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  pupId: PropTypes.string.isRequired,
  cups: PropTypes.number,
  index: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  logItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#4E342E',
    paddingLeft: 20,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logItemFirst: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#4E342E',
    paddingLeft: 20,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  chevron: {
    color: '#4E342E',
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
    lineHeight: 20,
    paddingRight: 10,
  },
  byLine: {
    color: '#4E342E',
    fontFamily: 'open-sans-regular',
    fontSize: 12,
    lineHeight: 20,
    paddingRight: 10,
  },
});