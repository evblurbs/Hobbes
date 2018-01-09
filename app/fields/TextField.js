import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import ButtonPaw from '../components/ButtonPaw';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class TextField extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    this.state = {
      label: state.params.label,
      text: state.params.text,
      description: state.params.description,
      onUpdate: state.params.onUpdate,
    };
  }
  _onPressButton() {
    this.state.onUpdate(this.state.text);
    this.props.navigation.goBack();
  }
  render() {
    return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.state.label}
            placeholderTextColor={'#4E342E'}
            returnKeyType = {'done'}
            autoFocus = {true}
            value={this.state.text}
            onSubmitEditing={(event) => {
              this._onPressButton();
            }}
          />
          <Text style={styles.description}>{this.state.description}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCAAA4',
  },
  input: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3E2723',
    fontFamily: 'open-sans-regular',
    color: '#4E342E',
  },
  description: {
    color: '#4E342E',
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
  },
});