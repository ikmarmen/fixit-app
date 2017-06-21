import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StyleProvider } from 'native-base';
import Router from './js/components/router';
import Expo from 'expo';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

export default class FixIt extends Component {
  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
  }

  render() {
    return <StyleProvider style={getTheme(material)}>
      <Router />
    </StyleProvider>;
  }
}

AppRegistry.registerComponent('FixIt', () => FixIt);
