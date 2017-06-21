import { observable, computed, action, asMap, autorun } from 'mobx';
import { AsyncStorage } from 'react-native';
import Fetch from '../utils/fetch-json';
import { Actions, ActionConst } from 'react-native-router-flux';

class RouterStore {
  @observable isAuthenticated = false;
  @observable isFontsLoaded = false;
  @observable user = null;

  constructor() {
    this.fetchUserInfo();
  }

  @action
  fetchUserInfo() {
    Fetch('startup', { method: 'GET' })
      .then(data => {
        this.isAuthenticated = true;
        this.user = data.user;
        //Actions.home({type: ActionConst.REPLACE});
      })
      .catch(error => {
        this.isAuthenticated = false;
        AsyncStorage.removeItem('TOKEN');
      });
  }
}

const routerStore = new RouterStore()
export default routerStore