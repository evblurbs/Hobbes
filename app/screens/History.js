import React from 'react';
import { StyleSheet, Image, ScrollView, View } from 'react-native';
import { BlurView } from 'expo';
import HistoryItem from '../components/Loggers/HistoryItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class History extends React.Component {

  render() {
    const logs = this.props.screenProps.logs.map((log, index) => {
      return (
        <HistoryItem
          key={log.id}
          id={log.id}
          pupId={this.props.screenProps.pupID}
          index={index}
          type={log.type}
          cups={log.cups}
          timestamp={log.timestamp}
          ownerName={log.ownerName}
          />
      );
    });
    return (
      <View style={{ flex: 1 }}>
        <Image source={require('../../assets/hobbes.jpg')} style={styles.image} />
        <BlurView tint="light" intensity={40} style={StyleSheet.absoluteFill}>
          <ScrollView>
            {logs}
          </ScrollView>
        </BlurView>
      </View>
    );
  }
}

History.navigationOptions = {
  tabBarLabel: 'History',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'md-list-box' : 'ios-list'}
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
});