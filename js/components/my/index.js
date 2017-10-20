import React, { Component } from 'react';
import { View } from 'react-native';
import List from './list/';
import Navbar from '../../controls/navBar';

export default class My extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navbar title='My Fixit'
          onClearText={() => null}
          onSearch={() => null}
          onOpenFilter={() => null} />
          <List/>
      </View>
    );
  }
}

const styles ={

};