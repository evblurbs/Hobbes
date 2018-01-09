import React from 'react';
import { StyleSheet, Text, Image, ScrollView, View } from 'react-native';
import { BlurView } from 'expo';
import ButtonPaw from '../components/ButtonPaw';
import MenuRight from '../components/MenuRight';
import AgeIntervals from '../components/AgeIntervals';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Setup extends React.Component {

  _updateBday(bday) {
    console.log('bday', bday);
    this.props.screenProps.onUpdate({ bday: bday });
  }

  _updateOwnerProfile(ownerName, ownerId) {
    this.props.screenProps.onUpdate({
      ownerName: ownerName,
      ownerId: ownerId,
    });
  }

  _renderPuppyInfo() {
    if(!this.props.screenProps.bday) {
      return (
        <MenuRight
          onPress={() => this.props.navigation.navigate('PupProfile', {
            onUpdate: this._updateBday.bind(this),
          })}
          title={'Pup Profile'}
          description={"Update your pup's profile so we can help you set potty intervals, know more about your breed, and give you tips."}
        />
      );
    } else {
      return (
        <AgeIntervals bday={this.props.screenProps.bday} />
      );
    }
  }

  _renderOwnerInfo() {
    if(!this.props.screenProps.ownerId || !this.props.screenProps.ownerName) {
      return (
        <MenuRight
          onPress={() => this.props.navigation.navigate('OwnerProfile', {
            onUpdate: this._updateOwnerProfile.bind(this),
          })}
          title={'Owner Profile'}
          description={"Update your owner profile so you can share with other parents or care takers of your pup."}
        />
      );
    }
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
          <Image source={require('../../assets/hobbes.jpg')} style={styles.image} />
          <BlurView tint="light" intensity={60} style={StyleSheet.absoluteFill}>
            <ScrollView>
              {this._renderPuppyInfo()}
              {this._renderOwnerInfo()}
              <View style={styles.descContainer}>
                <Text style={styles.descText}><Text style={styles.descCallout}>Complete your pup's profile and your profile to begin tracking activities for {this.props.screenProps.pupName}!</Text> You are logged in with the following email address:</Text>
                <Text style={styles.descText}>{this.props.screenProps.email}</Text>
                <Text style={styles.descText}>If this is incorrect, please logout below.</Text>
              </View>
              <ButtonPaw
                onPress={() => this.props.screenProps.logout()}
                text={'Logout'}
              />
            </ScrollView>
          </BlurView>
        </View>
    );
  }
}

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
  },
  descContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 4,
    backgroundColor: 'rgba(188,170,164,0.8)',
    borderBottomWidth: 1,
    borderColor: '#4E342E',
  },
  descText: {
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    marginBottom: 16,
    color: '#3E2723',
  },
  descCallout: {
    fontFamily: 'open-sans-bold',
  },
});