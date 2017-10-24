import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import AlertsStore from './store';
import List from './list/';
import Navbar from '../../controls/navBar';

@observer
export default class My extends Component {
  constructor(props) {
    super(props);
    this.store = AlertsStore;
  }
  componentWillMount() {
    AlertsStore.initialize();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navbar title='Alerts' isFilterVisible={false} isSearchVisible={false}/>
        <List store={this.store} />
      </View>
    );
  }
}

const styles = {

};