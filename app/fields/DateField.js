import React from 'react';
import { StyleSheet, View, DatePickerIOS } from 'react-native';
import ButtonPaw from '../components/ButtonPaw';

export default class DateField extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    this.state = {
      date: state.params.date,
      onUpdate: state.params.onUpdate,
    };
  }
  _onPressButton() {
    this.state.onUpdate(this.state.date);
    this.props.navigation.goBack();
  }
  render() {
    return (
        <View style={styles.container}>
          <DatePickerIOS
            mode={'date'}
            date={this.state.date}
            onDateChange={(date) => this.setState({ date: date })} />
          <ButtonPaw
            onPress={() => this._onPressButton()}
            text={'Update'}
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
    paddingTop: 20,
  },
});