import { StackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';

const RootNavigator = StackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      headerTitle: 'Hobbes',
      headerTintColor: '#3E2723',
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Login',
      headerTintColor: '#3E2723',
    },
  },
  Signup: {
    screen: Login,
    navigationOptions: {
      headerTitle: 'Signup',
      headerTintColor: '#3E2723',
    },
  },
});

export default RootNavigator;