import React, { Component } from 'react';
import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import Adverts from '../adverts/'
import MyAdverts from '../myAdverts/'
import Notifications from '../notifications/'
import Account from '../account/'

class MainStore {
  @observable tabs = [];
  @observable activeTab = null;
  @observable type = null;
  @observable error = null;
  @observable isFabActive = false;

  types = {
    camera: 'camera',
    galery: 'galery'
  }

  constructor() {
    autorun(() => this.pushView(this.type));
    autorun(() => this.showErrors());

    this.activeTab = {
      icon: 'search',
      component: <Adverts />
    };
    this.tabs.push(this.activeTab);
    this.tabs.push({
      icon: 'keypad',
      component: <MyAdverts />
    });
    this.tabs.push({
      icon: 'notifications',
      badgeCount: 2,
      component: <Notifications />
    });
    this.tabs.push({
      icon: 'person',
      component: <Account />
    });
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action
  selectTab = (tab) => {
    this.activeTab = tab;
  }

  @action
  toggleFab = () => {
    this.isFabActive = !this.isFabActive;
  }

  pushView(type) {
    switch (type) {
      case this.types.camera:
        {
          Actions.camera({ type: ActionConst.PUSH });
        }
        break;
      case this.types.galery:
        {

        }
        break;
      default:
        {
          return
        }
    }
  }

  @action
  openCamera=()=> {
    this.pushView(this.types.camera);
  }
  @action
  openGalery=()=> {
    this.pushView(this.types.galery);
  }
}
const Store = new MainStore();
export default Store;