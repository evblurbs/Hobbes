import React from 'react';
import { StyleSheet, Text, Image, View, DatePickerIOS, Picker } from 'react-native';
import ButtonPaw from '../components/ButtonPaw';
import { breeds, monthNames, pupSizes } from '../config/constants';
import { updatePupProfile } from '../api/api';
import { SecureStore } from 'expo';
import MenuRight from '../components/MenuRight';

const DATE_DESC = "Your pup's birthday is used for potty intervals and more.";
const BREED_DESC = 'What type of dog is your puppy?';
const PUP_SIZE_DESC = 'How big will your puppy grow?';

export default class PupProfile extends React.Component {
  constructor(props) {
    super(props);
    var initDate = new Date();
    initDate.setDate(initDate.getDate() - 56);
    const { state } = this.props.navigation;
    this.state = {
      bday: initDate,
      dateDesc: DATE_DESC,
      breed: null,
      breedDesc: BREED_DESC,
      pupSize: null,
      pupSizeDesc: PUP_SIZE_DESC,
      isLoading: false,
      onUpdate: state.params.onUpdate,
    };
  }
  _onBdayUpdate(date) {
    var day = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();
    this.setState({
      bday: date,
      dateDesc: `${month} ${day} ${year}`,
    });
  }
  _onBreedUpdate(breed) {
    this.setState({
      breed: breed,
      breedDesc: breed,
    });
  }
  _onPupSizeUpdate(size) {
    this.setState({
      pupSize: size,
      pupSizeDesc: size,
    });
  }
  _onPressButton() {
    this.setState({
      isLoading: true,
    });
    updatePupProfile(this.props.screenProps.pupID, {
      birthday: this.state.bday,
      breed: this.state.breed,
      size: this.state.pupSize,
    }).then(() => {
      SecureStore.setItemAsync('bday', this.state.bday.toString());
      this.state.onUpdate(this.state.bday.toString());
      this.props.navigation.goBack();
    });
  }
  render() {
    const breedItems = breeds.map((breed, index) => {
      return (
        <Picker.Item label={breed} value={breed} key={index} />
      )
    })
    return (
        <View style={styles.container}>
          <MenuRight
            onPress={() => this.props.navigation.navigate('PupBday', {
              date: this.state.bday,
              onUpdate: this._onBdayUpdate.bind(this),
            })}
            title={'Birthday:'}
            description={this.state.dateDesc}
          />
          <MenuRight
            onPress={() => this.props.navigation.navigate('PupBreed', {
              items: breeds,
              item: this.state.breed,
              onUpdate: this._onBreedUpdate.bind(this),
            })}
            title={'Breed:'}
            description={this.state.breedDesc}
          />
          <MenuRight
            onPress={() => this.props.navigation.navigate('PupSize', {
              items: pupSizes,
              onUpdate: this._onPupSizeUpdate.bind(this),
            })}
            title={'Size:'}
            description={this.state.pupSizeDesc}
          />
          <ButtonPaw
            onPress={() => this._onPressButton()}
            text={'Update'}
            disabled={(this.state.breedDesc === BREED_DESC || this.state.dateDesc === DATE_DESC || this.state.pupSizeDesc === PUP_SIZE_DESC) ? true : false}
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