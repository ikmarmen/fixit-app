import React, { Component } from 'react';
import { observable, computed, action } from 'mobx';
import Adverts from '../adverts/'
import MyAdverts from '../myAdverts/'
import MyBids from '../myBids/'
import Account from '../account/'

class MainStore {
  @observable tabs = [];

  constructor() {
    this.tabs.push({
      icon: 'search',
      component: <Adverts/>,
      isAvtive: true
    });
    this.tabs.push({
      icon: 'keypad',
      component: <MyAdverts/>,
      isAvtive: false
    });
    this.tabs.push({
      icon: 'notifications',
      badgeCount: 2,
      component: <MyBids/>,
      isAvtive: false
    });
    this.tabs.push({
      icon: 'person',
      component: <Account/>,
      isAvtive: false
    });

  }

  @computed
  get isAuthenticated() {
    return (this.user != null);
  }

  @action
  selectTab = (index) => {
    this.tabs.forEach((tab) => {
      tab.isAvtive = false;
    })
    this.tabs[index].isAvtive = true;
  }
}
const Store = new MainStore();
export default Store;