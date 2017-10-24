import React, { Component } from 'react';
import { observer } from 'mobx';
import { Router, Scene, Actions, Switch } from 'react-native-router-flux';
import AuthStore from './auth/authStore'
import { NativeModules, processColor, BackHandler, Platform } from 'react-native';
const { StatusBarManager } = NativeModules;
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

//Signin Signup
import Loading from './loading';
import Login from './auth/login';
import Signup from './auth/signup';
import ForgotPassword from './auth/forgotPassword';

//My adverts
import MyAdvert from './my/advert/';
import MyAdvertsFilter from './my/filter/index'

//New Advert pages
import NewAdvert from './adverts/new/';

//Adverts pages
import Advert from './adverts/advert/';
import Quote from './adverts/quote/';
import AdvertsFilter from './adverts/list/filter/';
import AdvertsNavBar from './adverts/navbar'

//Tabs content
import My from './my/';
import Adverts from './adverts/';
import Interested from './interested/';
import Alerts from './alerts/';

//Settings tab pages
import SettingsMain from './settings/';
import About from './settings/about';
import Help from './settings/help';
import Settings from './settings/settings';
import Account from './settings/account/';


import NavBar from './navbar/'

const TabIcon = (props, name) => {
  return <MaterialIcon style={{ color: props.focused ? 'white' : '#a0a0a0' }} size={25} name={name} />
};

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if(Platform.OS != 'ios'){
      StatusBarManager.setColor(processColor('#264559'), false);
    }
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
            component={My}
            hideNavBar={true}
            icon={props => { return TabIcon(props, 'dashboard') }}
          />
          <Scene key="interested"
            component={Interested}
            hideNavBar={true}
            title={'Interested'}
            icon={props => { return TabIcon(props, 'star-border') }}
          />
          <Scene key="alerts"
            component={Alerts}
            hideNavBar={true}
            title={'Alerts'}
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
        <Scene key="newAdvert" component={NewAdvert} direction='vertical' />
        <Scene key="myAdvert" component={MyAdvert} direction='vertical' />
        <Scene key="myAdvertsFilter" component={MyAdvertsFilter} direction='vertical' />

        <Scene key="settingsMain" component={SettingsMain} direction='vertical'/>
        <Scene key="account" component={Account} direction='vertical'/>
        <Scene key="settings" component={Settings} direction='vertical'/>
        <Scene key="about" component={About} direction='vertical'/>
        <Scene key="help" component={Help} direction='vertical'/>
      </Scene>
    </Router>;
  }
}