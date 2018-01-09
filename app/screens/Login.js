import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import ButtonPaw from '../components/ButtonPaw';
import * as EmailValidator from 'email-validator';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      isLoading: false,
      isEmailValid: true,
      isNameValid: true,
    };
  }
  _onPressButton() {
    if(this.state.email.length && this.state.name.length && this.state.isEmailValid && this.state.isNameValid) {
      this.setState({ isLoading: true });
      this.props.screenProps(this.state.email, this.state.name);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={this.state.isEmailValid ? styles.input : styles.inputError}
          onChangeText={(email) => this.setState({email})}
          placeholder={'Email'}
          placeholderTextColor={'#4E342E'}
          keyboardType={'email-address'}
          returnKeyType = {'next'}
          autoFocus = {true}
          value={this.state.email}
          onBlur={() => {
            this.setState({
              isEmailValid: EmailValidator.validate(this.state.email),
            });
          }}
          onSubmitEditing={(event) => {
            this.setState({
              isEmailValid: EmailValidator.validate(this.state.email),
            });
            this.refs.nameInput.focus();
          }}
        />
        <TextInput
          style={this.state.isNameValid ? styles.input : styles.inputError}
          ref='nameInput'
          onChangeText={(name) => this.setState({name})}
          placeholder={'Pup\'s Name'}
          placeholderTextColor={'#4E342E'}
          returnKeyType = {'go'}
          value={this.state.name}
          onBlur={() => {
            this.setState({
              isNameValid: this.state.name.length,
            });
          }}
          onSubmitEditing={(event) => {
            this.setState({
              isNameValid: this.state.name.length,
            });
            this._onPressButton();
          }}
        />
        <ButtonPaw
          onPress={this._onPressButton.bind(this)}
          text={'Woof!'}
          isLoading={this.state.isLoading}
          disabled={(this.state.email.length && this.state.name.length && this.state.isEmailValid && this.state.isNameValid) ? false : true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCAAA4',
    paddingTop: 30,
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
  input: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3E2723',
    fontFamily: 'open-sans-regular',
    color: '#4E342E',
  },
  inputError: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#BF360C',
    fontFamily: 'open-sans-regular',
    color: '#4E342E',
  },
});