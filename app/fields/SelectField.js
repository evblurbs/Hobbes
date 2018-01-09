import React from 'react';
import { StyleSheet, View, Picker } from 'react-native';
import ButtonPaw from '../components/ButtonPaw';

export default class SelectField extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    this.state = {
      item: state.params.item ? state.params.item : state.params.items[0],
      items: state.params.items,
      onUpdate: state.params.onUpdate,
    };
  }
  _onPressButton() {
    this.state.onUpdate(this.state.item);
    this.props.navigation.goBack();
  }
  render() {
    const items = this.state.items.map((item, index) => {
      return (
        <Picker.Item label={item} value={item} key={index} />
      );
    });
    return (
        <View style={styles.container}>
          <Picker
            selectedValue={this.state.item}
            onValueChange={(itemValue, itemIndex) => this.setState({ item: itemValue })} >
            {items}
          </Picker>
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