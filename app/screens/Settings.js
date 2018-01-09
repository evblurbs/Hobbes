import React from 'react';
import { StyleSheet, Image, ScrollView, View } from 'react-native';
import { BlurView } from 'expo';
import MenuRight from '../components/MenuRight';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image source={require('../../assets/hobbes.jpg')} style={styles.image} />
        <BlurView tint="light" intensity={40} style={StyleSheet.absoluteFill}>
          <ScrollView>
            <MenuRight
              onPress={() => console.log('pressed')}
              title={'Puppy Profile'}
              description={`Edit the birthday, breed, and size for ${this.props.screenProps.pupName}.`}
              style={styles.firstMenuItem}
            />
            <MenuRight
              onPress={() => console.log('pressed')}
              title={'User Profile'}
              description={"Edit your name, relationship, and email subscription(s)."}
            />
            <MenuRight
              onPress={() => this.props.navigation.navigate('Invite')}
              title={'Invite Users'}
              description={"Invite co-parents, walkers, aunts, uncles, and friends to see and log activites for your puppy."}
            />
            <MenuRight
              onPress={() => this.props.screenProps.logout()}
              title={'Logout'}
              description={"Logout and delete your puppy's data saved locally on your phone."}
            />
          </ScrollView>
        </BlurView>
      </View>
    );
  }
}

Settings.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-settings' : 'ios-settings-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: '#BCAAA4',
    opacity: 0.8,
  },
  firstMenuItem: {
    borderTopWidth: 1,
    borderColor: '#4E342E',
  },
});