import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import InterestedListStore from './store';
import List from './list/';
import Navbar from '../../controls/navBar';

@observer
export default class Interested extends Component {
  constructor(props) {
    super(props);
    this.store = InterestedListStore;
  }
  componentWillMount() {
    InterestedListStore.initialize();
  }
  render() {
    return <View style={{ flex: 1 }}>
      <Navbar title='INTERESTED'
        isFilterVisible={false}
        isSearchVisible={false} />
      <List store={this.store} />
    </View>;
  }
}