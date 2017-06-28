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
      text: 'Explore',
      icon: 'search',
      badgeCount: 0,
      component: <Adverts/>,
      isAvtive: true
    });
    this.tabs.push({
      text: 'My Adverts',
      icon: 'keypad',
      badgeCount: 0,
      component: <MyAdverts/>,
      isAvtive: false
    });
    this.tabs.push({
      text: 'My Bids',
      icon: 'stats',
      badgeCount: 0,
      component: <MyBids/>,
      isAvtive: false
    });
    this.tabs.push({
      text: 'Profile',
      icon: 'person',
      badgeCount: 0,
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