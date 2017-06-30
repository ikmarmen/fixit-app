import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Text, Button } from 'native-base';
import { Router, Scene, Actions } from 'react-native-router-flux';
import AuthStore from './auth/authStore'

import Loading from './loading';
import Main from './main/';
import Auth from './auth/';
import Account from './account/';
import Advert from './adverts/advert';
import AdvertAdd from './adverts/advertAdd';
import CameraView from './camera/';

@observer
export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.store = AuthStore;
  }

  render() {
    return <Router>
      <Scene key="root" hideNavBar={true}>
        <Scene key="loading" component={Loading} initial={true} />
        <Scene key="auth" component={Auth} />
        <Scene key="main" component={Main} />
        <Scene key="advert" component={Advert} direction='vertical' />
        <Scene key="advertAdd" component={AdvertAdd} direction='vertical' />
        <Scene key="camera" component={CameraView} direction='vertical' />
      </Scene>
    </Router>;
  }
}