import React, { Component } from 'react';
import {View} from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import MyAdvertsList from './myAdvertsList'

@observer
export default class MyAdverts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={{ flex: 1 }}>
      <MyAdvertsList />
    </View>;
  }
}