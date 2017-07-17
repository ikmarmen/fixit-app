import React, { Component } from 'react';
import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import Adverts from '../adverts/'
import MyAdverts from '../myAdverts/'
import Notifications from '../notifications/'
import Account from '../account/'
import NewAdvertStore from '../newAdvert/newAdvertStore'

class MainStore {
  @observable error = null;
  @observable isFabActive = false;

  constructor() {
    autorun(() => this.showErrors());
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action
  toggleFab = () => {
    this.isFabActive = !this.isFabActive;
  }
}
const Store = new MainStore();
export default Store;