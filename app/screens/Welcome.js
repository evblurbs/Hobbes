import React from 'react';
import { StyleSheet, Text, Image, } from 'react-native';
import ButtonPaw from '../components/ButtonPaw';

export default class Welcome extends React.Component {
  render() {
    return (
      <Image source={require('../../assets/hobbes.jpg')} style={styles.container}>
        <ButtonPaw
          onPress={() => this.props.navigation.navigate('Login')}
          text={'Login'}
        />
        <ButtonPaw
          onPress={() => this.props.navigation.navigate('Signup')}
          text={'Signup'}
        />
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCAAA4',
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  header: {
    fontFamily: 'roboto-bold',
    fontSize: 33,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    textAlign: 'center',
    color: '#3E2723',
  }
});