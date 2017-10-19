import React, { Component } from 'react';
import { observer } from 'mobx';
import { Router, Scene, Actions, Switch } from 'react-native-router-flux';
import AuthStore from './auth/authStore'
import { NativeModules, processColor, BackHandler } from 'react-native';
const { StatusBarManager } = NativeModules;
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Loading from './loading';
import Login from './auth/login';
import Signup from './auth/signup';
import ForgotPassword from './auth/forgotPassword';
import Advert from './adverts/advert/';
import Quote from './adverts/quote/';
import AdvertsFilter from './adverts/list/filter/';
import CameraView from './camera/';
import NewAdvert from './adverts/new/';
import MyAdvert from './myAdverts/myAdvert';

import SettingsMain from './settings/';
import About from './settings/about';
import Help from './settings/help';
import Settings from './settings/settings';
import Account from './settings/account/';

import MyAdverts from './myAdverts/';
import Adverts from './adverts/';
import Interested from './interested/';
import Notifications from './notifications/';

import NavBar from './navbar/'
import AdvertsNavBar from './adverts/navbar'

const TabIcon = (props, name) => {
  return <MaterialIcon style={{ color: props.focused ? 'white' : '#a0a0a0' }} size={25} name={name} />
};

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    StatusBarManager.setColor(processColor('#264559'), false);
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid());
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
  }

  render() {
    return <Router>
      <Scene key="root" hideNavBar={true} duration={500}>
        <Scene key="tabbar" tabs={true} tabBarStyle={{ backgroundColor: '#264559' }} tabBarPosition="bottom" showIcon={true} showLabel={false}>
          <Scene key="adverts"
            component={Adverts}
            navBar={AdvertsNavBar}
            icon={(props) => { return TabIcon(props, 'home') }}
            initial={true}
            title={'Home'}
          />
          <Scene key="myAdverts"
            component={MyAdverts}
            navBar={NavBar}
            title={'My Fixit'}
            icon={props => { return TabIcon(props, 'dashboard') }}
          />
          <Scene key="interested"
            component={Interested}
            navBar={NavBar}
            title={'Interested'}
            icon={props => { return TabIcon(props, 'star-border') }}
          />
          <Scene key="notifications"
            component={Notifications}
            hideNavBar={true}
            icon={props => { return TabIcon(props, 'notifications') }}
          />
        </Scene>
        <Scene key="loading" component={Loading} initial={true} />
        <Scene key="login" component={Login} hideNavBar={true} />
        <Scene key="signup" component={Signup} />
        <Scene key="forgotPassword" component={ForgotPassword} />
        <Scene key="advert" component={Advert} direction='vertical' />
        <Scene key="advertsFilter" component={AdvertsFilter} direction='vertical' />
        <Scene key="quote" component={Quote} direction='vertical'/>
        <Scene key="camera" component={CameraView} direction='vertical' />
        <Scene key="newAdvert" component={NewAdvert} direction='vertical' />
        <Scene key="myAdvert" component={MyAdvert} direction='vertical' />

        <Scene key="settingsMain" component={SettingsMain} direction='vertical'/>
        <Scene key="account" component={Account} direction='vertical'/>
        <Scene key="settings" component={Settings} direction='vertical'/>
        <Scene key="about" component={About} direction='vertical'/>
        <Scene key="help" component={Help} direction='vertical'/>
      </Scene>
    </Router>;
  }
}