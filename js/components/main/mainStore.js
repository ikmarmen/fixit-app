import React, { Component } from 'react';
import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import Adverts from '../adverts/'
import MyAdverts from '../myAdverts/'
import Notifications from '../notifications/'
import Account from '../account/'
import NewAdvertStore from '../newAdvert/newAdvertStore'

class MainStore {
  @observable tabs = [];
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

    this.tabs.push({
      icon: 'search',
      component: Adverts,
      isActive:true
    });
    this.tabs.push({
      icon: 'keypad',
      component: MyAdverts,
      isActive:false
    });
    this.tabs.push({
      icon: 'notifications',
      badgeCount: 2,
      component: Notifications,
      isActive:false
    });
    this.tabs.push({
      icon: 'person',
      component: Account,
      isActive:false
    });
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action
  selectTab = (selectedTab) => {
    this.tabs.forEach(tab=>{
        tab.isActive = (selectedTab===tab);
    });
  }

  @action
  toggleFab = () => {
    this.isFabActive = !this.isFabActive;
  }

  @action
  pushView(type) {
    let newAdvertStore = new NewAdvertStore(type);
    switch (type) {
      case this.types.camera:
        {
          Actions.camera({ type: ActionConst.PUSH, store: newAdvertStore });
        }
        break;
      case this.types.galery:
        {
          //Actions.galery({ type: ActionConst.PUSH, store: newAdvertStore });
        }
        break;
      default:
        {
          return
        }
    }
  }
}
const Store = new MainStore();
export default Store;