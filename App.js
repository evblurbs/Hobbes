import React from 'react';
import { Font, SecureStore, Asset } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import Anonymous from './app/navigation/Anonymous';
import Recognized from './app/navigation/Recognized';
import Setup from './app/navigation/Setup';
import { login } from './app/api/api';
import Sentry from 'sentry-expo';
import { db } from './app/config/constants';
import { formatDate } from './app/utils/strings';

Sentry.enableInExpoDevelopment = true;
Sentry.config('https://301519d9f3844260a6e20cfbfb72e8ea:b16ea5124c974132b623b9442e9529c8@sentry.io/257145').install();

import {
  StackNavigator,
} from 'react-navigation';

export default class App extends React.Component {
  state = {
    isAppReady: false,
    pupID: null,
    pupName: null,
    email: null,
    bday: null,
    isOwnerProfileComplete: false,
    logs: [],
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loadLogs() {
    const pupId = this.state.pupID;
    if(pupId) {
      this.logs = db.collection(`pups/${pupId}/logs`).orderBy('timestamp', 'desc').limit(20).onSnapshot((querySnapshot) => {
        var recentLogs = [];
        querySnapshot.forEach(doc => {
          var id = doc.id;
          var data = doc.data();
          recentLogs.push({
            ...data,
            id,
          });
        });
        this.setState({ logs: recentLogs });
        SecureStore.setItemAsync('logs', JSON.stringify(recentLogs));
      });
    }
  }

  async _loadAssetsAsync() {
    await Font.loadAsync({
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    Asset.fromModule(require('./assets/slider.png')).downloadAsync();

    await SecureStore.getItemAsync('pupID')
      .then((pupID) => {
        this.setState({ pupID: pupID });
      });

    await SecureStore.getItemAsync('pupName')
      .then((pupName) => {
        this.setState({ pupName: pupName });
      });

    await SecureStore.getItemAsync('email')
      .then((email) => {
        this.setState({ email: email });
      });

    await SecureStore.getItemAsync('bday')
      .then((bday) => {
        this.setState({ bday: bday });
      });

    await SecureStore.getItemAsync('ownerName')
      .then((ownerName) => {
        this.setState({ ownerName: ownerName });
      });

    await SecureStore.getItemAsync('ownerId')
      .then((ownerId) => {
        this.setState({ ownerId: ownerId });
      });

    await SecureStore.getItemAsync('logs')
      .then((logs) => {
        this.setState({ logs: logs ? JSON.parse(logs) : [] });
      });

    this.setState({ isAppReady: true });

    this._loadLogs();
  }

  _handleLogin(email, name) {
    login(email, name)
      .then((response) => {
        if(response && response.data && response.data.pupID) {
          SecureStore.setItemAsync('pupID', response.data.pupID);
          SecureStore.setItemAsync('email', email);
          SecureStore.setItemAsync('pupName', name);
          if(response.data.ownerName) {
            SecureStore.setItemAsync('ownerName', response.data.ownerName);
          }
          if(response.data.ownerId) {
            SecureStore.setItemAsync('ownerId', response.data.ownerId);
          }
          if(response.data.bday) {
            SecureStore.setItemAsync('bday', response.data.bday);
          }
          this.setState({
            pupID: response.data.pupID,
            bday: response.data.bday,
            email: email,
            pupName: name,
            ownerName: response.data.ownerName,
            ownerId: response.data.ownerId,
          });
        }
      })
      .then(() => {
        this._loadLogs();
      });
  }

  _handleLogout() {
    SecureStore.deleteItemAsync('pupID');
    SecureStore.deleteItemAsync('email');
    SecureStore.deleteItemAsync('pupName');
    SecureStore.deleteItemAsync('bday');
    SecureStore.deleteItemAsync('ownerId');
    SecureStore.deleteItemAsync('ownerName');
    SecureStore.deleteItemAsync('logs');
    this.setState({
      pupID: null,
      email: null,
      pupName: null,
      bday: null,
      ownerId: null,
      ownerName: null,
      logs: [],
    });
    if(this.logs) {
      this.logs();
    }
  }

  _handleUpdate(data) {
    this.setState(data);
  }

  render() {
    if (this.state.isAppReady && !this.state.pupID) {
      return (
        <Anonymous screenProps={this._handleLogin.bind(this)} />
      );
    } else if (this.state.isAppReady && this.state.pupID) {
      if(!this.state.bday || !this.state.ownerId || !this.state.ownerName) {
        return (
          <Setup screenProps={{
            logout: this._handleLogout.bind(this),
            pupName: this.state.pupName,
            onUpdate: this._handleUpdate.bind(this),
            pupID: this.state.pupID,
            email: this.state.email,
            bday: this.state.bday,
            ownerName: this.state.ownerName,
            ownerId: this.state.ownerId,
          }} />
        );
      } else {
        return (
          <Recognized screenProps={{
            logout: this._handleLogout.bind(this),
            pupName: this.state.pupName,
            pupID: this.state.pupID,
            email: this.state.email,
            bday: this.state.bday,
            ownerName: this.state.ownerName,
            ownerId: this.state.ownerId,
            logs: this.state.logs,
          }} />
        );
      }
    } else {
      return (
        <View style={styles.container}>
          <Text>Loading..</Text>
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
