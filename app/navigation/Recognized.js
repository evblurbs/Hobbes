import { TabNavigator, StackNavigator } from "react-navigation";
import Feed from '../screens/Feed';
import History from '../screens/History';
import Settings from '../screens/Settings';
import PupProfile from '../screens/PupProfile';
import OwnerProfile from '../screens/OwnerProfile';
import Invite from '../screens/Invite';
import DateField from '../fields/DateField';
import SelectField from '../fields/SelectField';
import RadioField from '../fields/RadioField';
import TextField from '../fields/TextField';
import MultiSelectField from '../fields/MultiSelectField';

const MainTabNavigator = TabNavigator(
  {
    Feed: { screen: Feed },
    History: { screen: History },
    Settings: { screen: Settings },
  },
  {
    tabBarOptions: {
      activeTintColor: '#3E2723',
      inactiveTintColor: '#3E2723',
    }
  });

const MainStackNavigator = StackNavigator({
  Home: {
    screen: MainTabNavigator,
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
  Invite: {
    screen: Invite,
    navigationOptions: {
      headerTitle: "Invite User",
      headerTintColor: '#3E2723',
    },
  },
  InviteEmail: {
    screen: TextField,
    navigationOptions: {
      headerTitle: "Email",
      headerTintColor: '#3E2723',
    },
  },
});

export default MainStackNavigator;