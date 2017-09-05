import React, { Component } from 'react';
import {View} from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import AdvertsList from './advertsList'
import FabButton from '../fab/'

@observer
export default class AdvertsExplore extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={{flex:1}}>
      <AdvertsList/>
      <FabButton/>
    </View>;
  }
}