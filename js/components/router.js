import React, { Component } from 'react';
import { observer } from 'mobx';
import { Container, Content, Text, Button, View, Badge, Icon } from 'native-base';
import { Router, Scene, Actions, Switch } from 'react-native-router-flux';
import AuthStore from './auth/authStore'

import Loading from './loading';
import Auth from './auth/';
import Advert from './adverts/advert';
import CameraView from './camera/';
import NewAdvert from './newAdvert/newAdvert';
import MyAdvert from './myAdverts/myAdvert';

import Account from './account/';
import MyAdverts from './myAdverts/';
import Adverts from './adverts/';
import Notifications from './notifications/';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const TabIcon = (props, name) => {
  return <MaterialIcon style={{ color: props.focused ? 'red' : 'black' }} size={25} name={name} />
};

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.store = AuthStore;
  }

  render() {
    return <Router>
      <Scene key="root" hideNavBar={true} duration={0}>
      <Scene key="tabbar" tabs={true} tabBarStyle={{ backgroundColor: '#38947a' }} tabBarPosition="bottom" showIcon={true} showLabel={false}>
          <Scene key="adverts"
            component={Adverts}
            hideNavBar={true}
            icon={(props)=>{return TabIcon(props, 'home')}}
            initial={true}
          />
          <Scene key="myAdverts"
            component={MyAdverts}
            hideNavBar={true}
            icon={props=>{return TabIcon(props, 'dashboard')}}
          />
          <Scene key="notifications"
            component={Notifications}
            hideNavBar={true}
            icon={props=>{return TabIcon(props, 'notifications')}}
          />
          <Scene key="account"
            component={Account}
            hideNavBar={true}
             icon={props=>{return TabIcon(props, 'account-box')}}
          />
        </Scene>
        <Scene key="loading" component={Loading} initial={true} />
        <Scene key="auth" component={Auth} hideNavBar={true}/>
        <Scene key="advert" component={Advert} />
        <Scene key="camera" component={CameraView} direction='vertical' />
        <Scene key="newAdvert" component={NewAdvert} direction='vertical' />
        <Scene key="myAdvert" component={MyAdvert} direction='vertical' />
      </Scene>
    </Router>;
  }
}