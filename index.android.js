import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Router from './js/components/router';

export default class FixIt extends Component {
  render() {
    return <Router />
  }
}

AppRegistry.registerComponent('FixIt', () => FixIt);
