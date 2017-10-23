import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import MyListStore from './store';
import List from './list/';
import Navbar from '../../controls/navBar';

@observer
export default class My extends Component {
  constructor(props) {
    super(props);
    this.store = MyListStore;
  }
  componentWillMount() {
    MyListStore.initialize();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navbar title='My Fixit'
          onClearText={() => null}
          onSearch={() => null}
          onOpenFilter={() => null} />
          <List store={this.store}/>
      </View>
    );
  }
}

const styles ={

};