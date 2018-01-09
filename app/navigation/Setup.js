import { StackNavigator } from 'react-navigation';
import PupProfile from '../screens/PupProfile';
import OwnerProfile from '../screens/OwnerProfile';
import DateField from '../fields/DateField';
import SelectField from '../fields/SelectField';
import RadioField from '../fields/RadioField';
import TextField from '../fields/TextField';
import MultiSelectField from '../fields/MultiSelectField';
import Setup from '../screens/Setup';

const RootNavigator = StackNavigator({
  Welcome: {
    screen: Setup,
    navigationOptions: {
      headerTitle: 'Hobbes',
      headerTintColor: '#3E2723',
    },
  },
  PupProfile: {
    screen: PupProfile,
    navigationOptions: {
      headerTitle: "Profile",
      headerTintColor: '#3E2723',
    },
  },
  OwnerProfile: {
    screen: OwnerProfile,
    navigationOptions: {
      headerTitle: "Profile",
      headerTintColor: '#3E2723',
    },
  },
  PupBday: {
    screen: DateField,
    navigationOptions: {
      headerTitle: "Birthday",
      headerTintColor: '#3E2723',
    },
  },
  PupBreed: {
    screen: SelectField,
    navigationOptions: {
      headerTitle: "Breed",
      headerTintColor: '#3E2723',
    },
  },
  OwnerRelationship: {
    screen: SelectField,
    navigationOptions: {
      headerTitle: "Relationship",
      headerTintColor: '#3E2723',
    },
  },
  PupSize: {
    screen: RadioField,
    navigationOptions: {
      headerTitle: "Size",
      headerTintColor: '#3E2723',
    },
  },
  OwnerName: {
    screen: TextField,
    navigationOptions: {
      headerTitle: "Name",
      headerTintColor: '#3E2723',
    },
  },
  OwnerEmailLists: {
    screen: MultiSelectField,
    navigationOptions: {
      headerTitle: "Subscribe",
      headerTintColor: '#3E2723',
    },
  },
});

export default RootNavigator;