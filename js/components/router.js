import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Text, Button } from 'native-base';
import { Router, Scene, Actions } from 'react-native-router-flux';
import RouterStore from './routerStore';

import Loading from './loading';
import Home from './home/';
import Login from './login/';
import Auth from './auth/';

@observer
export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.store = RouterStore;
  }

  render() {
    return <Router>
      <Scene key="root" hideNavBar={true}>
        <Scene key="auth" component={Auth} initial={true} />
        <Scene key="loading" component={Loading}/>
        <Scene key="login" component={Login}  />
        <Scene key="home" component={Home} />
      </Scene>
    </Router>;
  }
}