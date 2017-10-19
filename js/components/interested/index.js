import React, { Component } from 'react';
import {View} from 'react-native';
import { observer } from 'mobx-react';

@observer
export default class Interested extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={{flex:1}}>
    </View>;
  }
}