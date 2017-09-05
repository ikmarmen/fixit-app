import React, { Component } from 'react';
import { observer } from 'mobx';
import { Container, Content, Text, Button, View, Badge, Icon } from 'native-base';
import { Router, Scene, Actions, Switch } from 'react-native-router-flux';
import AuthStore from './auth/authStore'
import {NativeModules, processColor} from 'react-native';
const { StatusBarManager } = NativeModules;

import Loading from './loading';
import Login from './auth/login';
import Signup from './auth/signup';
import ForgotPassword from './auth/forgotPassword';
import Advert from './adverts/advert';
import CameraView from './camera/';
import NewAdvert from './newAdvert/newAdvert';
import MyAdvert from './myAdverts/myAdvert';

import Account from './account/';
import MyAdverts from './myAdverts/';
import Adverts from './adverts/';
import Notifications from './notifications/';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import NavBar from './navbar/'

const TabIcon = (props, name) => {
  return <MaterialIcon style={{ color: props.focused ? 'white' : '#a0a0a0' }} size={25} name={name} />
};

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    StatusBarManager.setColor(processColor('#264559'), false);
  }

  componentWillMount() {
    this.store = AuthStore;
  }

  render() {
    return <Router>
      <Scene key="root" hideNavBar={true} duration={0}>
      <Scene key="tabbar" tabs={true} tabBarStyle={{ backgroundColor: '#264559' }} tabBarPosition="bottom" showIcon={true} showLabel={false}>
          <Scene key="adverts"
            component={Adverts}
            navBar={NavBar}
            icon={(props)=>{return TabIcon(props, 'home')}}
            initial={true}
            title={'FIXIT - Home'}
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
        <Scene key="login" component={Login} hideNavBar={true}/>
        <Scene key="signup" component={Signup}/>
        <Scene key="forgotPassword" component={ForgotPassword}/>
        <Scene key="advert" component={Advert} />
        <Scene key="camera" component={CameraView} direction='vertical' />
        <Scene key="newAdvert" component={NewAdvert} direction='vertical' />
        <Scene key="myAdvert" component={MyAdvert} direction='vertical' />
      </Scene>
    </Router>;
  }
}