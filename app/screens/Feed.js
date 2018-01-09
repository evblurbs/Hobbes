import React from 'react';
import { StyleSheet, Text, Image, ScrollView, View } from 'react-native';
import { BlurView } from 'expo';
import ButtonPaw from '../components/ButtonPaw';
import MenuRight from '../components/MenuRight';
import AgeIntervals from '../components/AgeIntervals';
import Logger from '../components/Logger';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bday: this.props.screenProps.bday,
      ownerName: this.props.screenProps.ownerName,
      ownerId: this.props.screenProps.ownerId,
      pupId: this.props.screenProps.pupID,
    };
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
          <Image source={require('../../assets/hobbes.jpg')} style={styles.image} />
          <BlurView tint="light" intensity={40} style={StyleSheet.absoluteFill}>
            <ScrollView>
              <AgeIntervals bday={this.state.bday} />
              <Logger
                pupName={this.props.screenProps.pupName}
                ownerName={this.state.ownerName}
                ownerId={this.state.ownerId}
                pupId={this.state.pupId} />
            </ScrollView>
          </BlurView>
        </View>
    );
  }
}

Feed.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-home' : 'ios-home-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCAAA4',
    paddingTop: 20,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: '#BCAAA4',
    opacity: 0.8,
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