import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Text, Button } from 'native-base';
import { Router, Scene, Actions } from 'react-native-router-flux';

import Loading from './loading';
import Home from './home/';
import Auth from './auth/';
import Account from './account/';
import Advert from './adverts/advert';

@observer
export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Router>
      <Scene key="root" hideNavBar={true}>
        <Scene key="home" component={Home} initial={true}/>
        <Scene key="auth" component={Auth} />
        <Scene key="loading" component={Loading}/>
        <Scene key="account" component = {Account}/>
        <Scene key="advert" component = {Advert}/>
      </Scene>
    </Router>;
  }
}