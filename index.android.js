import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StyleProvider } from 'native-base';
import Router from './js/components/router';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

export default class FixIt extends Component {
  render() {
    return <StyleProvider style={getTheme(material)}>
      <Router />
    </StyleProvider>;
  }
}

AppRegistry.registerComponent('FixIt', () => FixIt);
