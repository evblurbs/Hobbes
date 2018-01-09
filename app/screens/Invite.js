import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonPaw from '../components/ButtonPaw';
import { inviteUser } from '../api/api';
import { SecureStore } from 'expo';
import MenuRight from '../components/MenuRight';
import Invited from '../components/Invited';

const EMAIL_DESC = 'Enter the email address of the user you\'d like to invite.';

export default class Invite extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    this.state = {
      emailDesc: EMAIL_DESC,
      email: null,
      isLoading: false,
      error: false,
    };
  }
  _onEmailUpdate(email) {
    if(!email) return;
    this.setState({
      email: email,
      emailDesc: email,
      error: false,
    });
  }
  _onPressButton() {
    this.setState({ isLoading: true });
    const screenProps = this.props.screenProps;
    inviteUser({
      pupId: screenProps.pupID,
      pupName: screenProps.pupName,
      invitedById: screenProps.ownerId,
      invitedByName: screenProps.ownerName,
      email: this.state.email.toLowerCase(),
    })
    .then((response) => {
      if(response && response.data && response.data.error) {
        return this.setState({
          isLoading: false,
          email: null,
          emailDesc: response.data.error,
          error: true,
        })
      }
      else {
        return this.setState({
          isLoading: false,
          email: null,
          emailDesc: EMAIL_DESC,
          error: false,
        });
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <MenuRight
          onPress={() => this.props.navigation.navigate('InviteEmail', {
            label: 'Email',
            text: this.state.email,
            description: EMAIL_DESC,
            onUpdate: this._onEmailUpdate.bind(this),
          })}
          title={'Email:'}
          error={this.state.error}
          description={this.state.emailDesc}
        />
        <ButtonPaw
          onPress={() => this._onPressButton()}
          text={'Invite'}
          disabled={(this.state.emailDesc === EMAIL_DESC) ? true : false}
          isLoading={this.state.isLoading}
        />
        <Invited
          pupId={this.props.screenProps.pupID}
          ownerEmail={this.props.screenProps.email}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCAAA4',
    width: null,
    height: null,
    paddingTop: 0,
  },
});