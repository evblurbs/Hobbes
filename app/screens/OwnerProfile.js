import React from 'react';
import { StyleSheet, Text, Image, View, DatePickerIOS, Picker } from 'react-native';
import ButtonPaw from '../components/ButtonPaw';
import { relationships, emailLists } from '../config/constants';
import { updateOwner } from '../api/api';
import { SecureStore } from 'expo';
import MenuRight from '../components/MenuRight';

const NAME_DESC = "Enter your name so other owners/caretakers know who you are.";
const RELATIONSHIP_DESC = 'Are you the owner, walker, nanny, or friend?';
const EMAIL_DESC = 'Would you like to get notified of tips for your pup or about app updates? You can select to receive no notifications.';

export default class OwnerProfile extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    this.state = {
      nameDesc: NAME_DESC,
      relationshipDesc: RELATIONSHIP_DESC,
      emailDesc: EMAIL_DESC,
      name: null,
      relationship: null,
      email: [],
      isLoading: false,
      onUpdate: state.params.onUpdate,
    };
  }
  _onNameUpdate(name) {
    if(!name) return;
    this.setState({
      name: name,
      nameDesc: name,
    });
  }
  _onRelationshipUpdate(relationship) {
    this.setState({
      relationship: relationship,
      relationshipDesc: relationship,
    });
  }
  _onEmailListsUpdate(subscriptions) {
    var subsKeys = [];
    for(let i = 0; i < subscriptions.length; i++) {
      subsKeys.push(subscriptions[i].key);
    }
    this.setState({
      email: subscriptions,
      emailDesc: subsKeys.join(', '),
    });
  }
  _onPressButton() {
    this.setState({ isLoading: true });
    updateOwner({
      pupID: this.props.screenProps.pupID,
      pupName: this.props.screenProps.pupName,
      ownerEmail: this.props.screenProps.email.toLowerCase(),
      relationship: this.state.relationship,
      name: this.state.name,
      email: this.state.email,
    }).then((response) => {
      SecureStore.setItemAsync('ownerName', this.state.name);
      SecureStore.setItemAsync('ownerId', response.data.ownerId);
      this.state.onUpdate(this.state.name, response.data.ownerId);
      this.props.navigation.goBack()
    });
  }
  render() {
    return (
        <View style={styles.container}>
          <MenuRight
            onPress={() => this.props.navigation.navigate('OwnerName', {
              label: 'Name',
              text: this.state.name,
              description: NAME_DESC,
              onUpdate: this._onNameUpdate.bind(this),
            })}
            title={'Name:'}
            description={this.state.nameDesc}
          />
          <MenuRight
            onPress={() => this.props.navigation.navigate('OwnerRelationship', {
              items: relationships,
              item: this.state.relationship,
              onUpdate: this._onRelationshipUpdate.bind(this),
            })}
            title={'Relationship:'}
            description={this.state.relationshipDesc}
          />
          <MenuRight
            onPress={() => this.props.navigation.navigate('OwnerEmailLists', {
              items: emailLists,
              selected: this.state.email,
              onUpdate: this._onEmailListsUpdate.bind(this),
            })}
            title={'Email Subscriptions:'}
            description={this.state.emailDesc}
          />
          <ButtonPaw
            onPress={() => this._onPressButton()}
            text={'Update'}
            disabled={(this.state.nameDesc === NAME_DESC || this.state.relationshipDesc === RELATIONSHIP_DESC || this.state.emailDesc === EMAIL_DESC) ? true : false}
            isLoading={this.state.isLoading}
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
  header: {
    fontFamily: 'roboto-bold',
    fontSize: 33,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    textAlign: 'center',
    color: '#3E2723',
  },
  label: {
    fontFamily: 'open-sans-regular',
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20,
    color: '#3E2723',
  }
});