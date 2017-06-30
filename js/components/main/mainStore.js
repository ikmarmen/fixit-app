import React, { Component } from 'react';
import { observable, computed, action, autorun } from 'mobx';
import Adverts from '../adverts/'
import MyAdverts from '../myAdverts/'
import Notifications from '../notifications/'
import Account from '../account/'

class MainStore {
  @observable tabs = [];
  @observable type = null;
  @observable error = null;

  types = {
    camera: 'camera',
    galery: 'galery'
  }

  constructor() {
    autorun(() => this.pushView(this.type));
    autorun(() => this.showErrors());

    this.tabs.push({
      icon: 'search',
      component: <Adverts />,
      isAvtive: true
    });
    this.tabs.push({
      icon: 'keypad',
      component: <MyAdverts />,
      isAvtive: false
    });
    this.tabs.push({
      icon: 'notifications',
      badgeCount: 2,
      component: <Notifications />,
      isAvtive: false
    });
    this.tabs.push({
      icon: 'person',
      component: <Account />,
      isAvtive: false
    });

  }
  
  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action
  selectTab = (index) => {
    this.tabs.forEach((tab) => {
      tab.isAvtive = false;
    })
    this.tabs[index].isAvtive = true;
  }

  pushView(type) {
    switch (type) {
      case this.types.camera:
        {

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
  openCamera() {
  }
  @action
  openGalery() {
  }
}
const Store = new MainStore();
export default Store;