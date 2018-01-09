import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { db } from '../config/constants';
import PropTypes from 'prop-types';

export default class Invited extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invited: [],
    };
  }

  componentDidMount () {
    this.users = db.collection(`pups/${this.props.pupId}/owners`)
      .onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach(doc => {
          var data = doc.data();
          if(data.email !== this.props.ownerEmail) {
            users.push(data);
          }
        });
        this.setState({
          invited: users,
        });
      });
  }

  componentWillUnmount() {
    if(this.users) {
      this.users();
    }
  }

  _renderIcon(complete) {
    if(complete) {
      return (
        <Ionicons
          name="ios-checkmark-outline"
          size={32}
          style={styles.chevron}
        />
      );
    }
    else {
      return (
        <Entypo
          name="dot-single"
          size={20}
          style={styles.chevron}
        />
      );
    }
  }

  _renderInvite(invite) {
    return (
      <View key={invite.email} style={styles.invite}>
        <View style={styles.valid}>
          {this._renderIcon(invite.complete)}
        </View>
        <Text style={styles.email} style={styles.description}>{invite.email}</Text>
      </View>
    );
  }

  render() {
    const invites = this.state.invited.map((invite, index) => {
      return this._renderInvite(invite);
    });
    if(this.state.invited.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Users:</Text>
          <View>
            {invites}
          </View>
        </View>
      );
    }
    else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
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
    lineHeight: 32,
  },
  valid: {
    width: 40,
    height: 32,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invite: {
    flexDirection: 'row',
  },
  email: {
    lineHeight: 40,
  },
  chevron: {
    color: '#4E342E',
  },
});