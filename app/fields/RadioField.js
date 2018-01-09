import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class RadioField extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    this.state = {
      items: state.params.items,
      selected: null,
      onUpdate: state.params.onUpdate,
    };
  }
  _onPressButton(item) {
    this.setState({ selected: item.key });
    this.state.onUpdate(item.key);
    this.props.navigation.goBack();
  }
  _renderItem(item, index) {
    let name;
    if (this.state.selected === item.key) {
      name = 'checkbox-blank-circle';
    } else {
      name = 'checkbox-blank-circle-outline'
    }
    return (
      <TouchableOpacity style={styles.item} onPress={() => this._onPressButton(item)} key={index}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name={name} size={32} style={styles.circle} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.header}>{item.key}</Text>
          <Text style={styles.description}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    var items = this.state.items.map((item, index) => this._renderItem(item, index))
    return (
        <View style={styles.container}>
          <ScrollView>
            {items}
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BCAAA4',
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#4E342E',
    paddingLeft: 10,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    width: 32,
    marginRight: 10,
  },
  circle: {
    color: '#4E342E',
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    color: '#4E342E',
    fontFamily: 'roboto-bold',
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    color: '#4E342E',
    fontFamily: 'open-sans-regular',
    fontSize: 14,
  },
});