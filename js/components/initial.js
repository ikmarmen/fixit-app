import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { AuthStore } from './auth/store';
import LocationStore from '../stores/locationStore';

export default class Initial extends Component {
  constructor(props) {
    super(props);
    this.authStore = AuthStore;
    this.socationStore = LocationStore;
  }

  render() {
    return (<View style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require('../../img/logoAnim.gif')}
      />
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#264559',
  },
  logoImage: {
    width: 75,
    height: 75,
    marginTop: '50%',
  }
});