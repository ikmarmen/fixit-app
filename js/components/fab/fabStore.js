import React, { Component } from 'react';
import { observable, action, autorun } from 'mobx';

class FabStore {
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
const Store = new FabStore();
export default Store;