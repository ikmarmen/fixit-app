import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {AuthStore} from './auth/authStore';
import LocationStore from '../stores/locationStore';

export default class Loading extends Component {
  render() {
    return       <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={require('../../img/logoAnim.gif')}
        />
      </View>
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