import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from 'mobx-react';

@observer
export default class AdvertsFilter extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    return (
      <View>
        <Text>sadasdasds asdasd</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  }
});
